import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NativeGeocoder, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import {Plugins} from '@capacitor/core';
import {Platform} from '@ionic/angular';
import {GoogleMapService} from '../../services/google--map.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {IAddressWithPostalCode, ICoordinates} from '../../interfaces/common';
// @ts-ignore
import Marker = google.maps.Marker;

const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: 'app-map-block',
  templateUrl: './map-block.component.html',
  styleUrls: ['./map-block.component.scss'],
})
export class MapBlockComponent implements OnInit {
  @Input() location$: Observable<string>;
  @Input() coordinates: ICoordinates;

  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  @Output() address$: EventEmitter<IAddressWithPostalCode> = new EventEmitter<IAddressWithPostalCode>();
  map: any;
  address: IAddressWithPostalCode;

  latitude: number;
  longitude: number;

  markers: Marker[] = [];
  constructor(
      private nativeGeocoder: NativeGeocoder,
      private _platform: Platform,
      private _googleMapService: GoogleMapService,
  ) { }

  ngOnInit() {
    this.loadMap();
    this.location$
        .pipe(
            debounceTime(500),
            distinctUntilChanged()
        )
        .subscribe(async (location) => {
          const coordinates: ICoordinates = await this._googleMapService.getCoordinates(location);
          if (this.map) {
            this.map.setCenter({...coordinates});
          }
        });
  }

  loadMap() {
    Geolocation.getCurrentPosition().then((resp) => {

      this.latitude = this.coordinates?.lat || resp.coords.latitude;
      this.longitude = this.coordinates?.lng || resp.coords.longitude;

      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP, 'custom'],
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
        },
      };

     //  this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      if (this.coordinates) {
        const googleLatLng = new google.maps.LatLng(this.coordinates.lat, this.coordinates.lng);
        this.addMarker(googleLatLng);
        this.markers.forEach(m => m.setMap(this.map));
        this.getAddressFromCoords(googleLatLng.lat(), googleLatLng.lng()).then();
      }

      this.map.addListener('click', async ($event) => {
        this.markers.forEach(m => m.setMap(null));
        this.markers = [];

        this.latitude = await $event.latLng.lat();
        this.longitude = await $event.latLng.lng();

        this.addMarker($event.latLng);

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng()).then();
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  async getAddressFromCoords(latitude, longitude) {
    this.address = await this._googleMapService.getAddress(latitude, longitude);
    this.address$.emit({
      ...this.address,
      latitude,
      longitude,
    });
    /*if (this._platform.is("desktop")) {
      this.address = await this._googleMapService.getAddress(lattitude, longitude);
      console.log('this.address', this.address);

    } else {
      try {
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };

        const result: NativeGeocoderResult[] = await this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      } catch (e) {
        this.address = "Address Not Available!";
      }

     /* this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
          .then((result: NativeGeocoderResult[]) => {
            console.log('reverseGeocode', result)
            this.address = "";
            let responseAddress = [];
            for (let [key, value] of Object.entries(result[0])) {
              if (value.length > 0)
                responseAddress.push(value);

            }
            responseAddress.reverse();
            for (let value of responseAddress) {
              this.address += value + ", ";
            }
            this.address = this.address.slice(0, -2);
          })
          .catch((error: any) => {
            this.address = "Address Not Available!";
          });
    }*/

  }

  addMarker(location) {
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Test'
    });
    this.markers.push(marker);
  }
}
