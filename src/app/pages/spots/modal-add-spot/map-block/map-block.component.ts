import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from "@ionic-native/native-geocoder/ngx";
import {Plugins} from "@capacitor/core";

const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: 'app-map-block',
  templateUrl: './map-block.component.html',
  styleUrls: ['./map-block.component.scss'],
})
export class MapBlockComponent implements OnInit {
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;
  constructor(
      private nativeGeocoder: NativeGeocoder,
  ) { }

  ngOnInit() {
    this.loadMap();
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

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
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
  }
}
