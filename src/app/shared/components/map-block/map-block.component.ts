import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NativeGeocoder, NativeGeocoderOptions} from "@ionic-native/native-geocoder/ngx";
import {Plugins} from "@capacitor/core";
import {Platform} from "@ionic/angular";
import {GoogleMapService} from "../../services/google--map.service";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {IAddressWithPostalCode, ICoordinates} from "../../interfaces/common";

const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: 'app-map-block',
  templateUrl: './map-block.component.html',
  styleUrls: ['./map-block.component.scss'],
})
export class MapBlockComponent implements OnInit {
  @Input() location$: Observable<string>
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  @Output() address$: EventEmitter<IAddressWithPostalCode> = new EventEmitter<IAddressWithPostalCode>()
  map: any;
  address: IAddressWithPostalCode;

  latitude: number;
  longitude: number;

  markers: google.maps.Marker[] = []
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
          this.map.setCenter({...coordinates})
        })
  }

  loadMap() {
    Geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

     //  this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('click', async ($event) => {
        this.markers.forEach(m => m.setMap(null));
        this.markers = []

        this.latitude = await $event.latLng.lat();
        this.longitude = await $event.latLng.lng();

        this.addMarker($event.latLng);

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng()).then()
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
    });
    this.markers.push(marker);
  }
}
