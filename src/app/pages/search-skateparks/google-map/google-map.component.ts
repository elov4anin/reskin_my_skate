import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import {ICoordinates} from '../../../shared/interfaces/common';
import {ISkatepark} from '../../../shared/interfaces/skatepark.interfaces';
import {Router} from '@angular/router';
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from '../../../tabs/tabs.enum';
import {CoreStore} from '../../../shared/store/core.store';
import {StorageEnum} from '../../../shared/store/Storage.enum';

const {Geolocation} = Plugins;

declare var google;

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
    @Input() coordinates: ICoordinates;
    @Input() skateparks: ISkatepark[] = [];
    @Input() searchValue: string;
    options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    @ViewChild('map', {static: false}) mapElement: ElementRef;
    @Output() loadMap$: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    map: any;
    address: string;

    latitude: number;
    longitude: number;

    mapStyles = [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{color: '#00ffc2'}]},
        {featureType: 'poi', elementType: 'labels.text.fill', stylers: [{color: '#ced762'}]},
        {featureType: 'poi.park', elementType: 'geometry', stylers: [{color: '#234135'}]},
        {featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{color: '#6b9a76'}]},
        {featureType: 'road', elementType: 'geometry', stylers: [{color: '#38414e'}]},
        {featureType: 'road', elementType: 'geometry.stroke', stylers: [{color: '#212a37'}]},
        {featureType: 'road', elementType: 'labels.text.fill', stylers: [{color: '#9ca5b3'}]},
        {featureType: 'road.highway', elementType: 'geometry', stylers: [{color: '#00699b'}]},
        {featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{color: '#0f1f0e'}]},
        {featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{color: '#80ceec'}]},
        {featureType: 'transit', elementType: 'geometry', stylers: [{color: '#2f3948'}]},
        {featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{color: '#c5c84d'}]},
        {featureType: 'water', elementType: 'geometry', stylers: [{color: '#17263c'}]},
        {featureType: 'water', elementType: 'labels.text.fill', stylers: [{color: '#515c6d'}]},
        {featureType: 'water', elementType: 'labels.text.stroke', stylers: [{color: '#17263c'}]}
    ];

    private RADIUS_SIZE: number = 8047; // 5 miles;
    private stylesMapType;

    constructor(
        private _router: Router,
        private _coreStore: CoreStore,
    ) {
    }

    ngOnInit() {
        this.stylesMapType = new google.maps.StyledMapType(this.mapStyles, { name: 'Custom' });
        this.loadMap();
    }

    loadMap() {
        const that = this;
        Geolocation.getCurrentPosition().then((resp) => {


            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;

            const latLng = new google.maps.LatLng(this.coordinates.lat, this.coordinates.lng);
            const mapOptions = {
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                center: latLng,
                zoom: 11,
                fullscreenControl: false,
                keyboardShortcuts: false,
                backgroundColor: '#202020',
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP, 'custom'],
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                },
                streetViewControl: false
            };

            // this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


            this.map.mapTypes.set('custom', this.stylesMapType);
            this.map.setMapTypeId('custom');
            google.maps.event.addListenerOnce(this.map, 'idle', () => {
                // add radius to map
                const radiusSearch = new google.maps.Circle({
                    strokeColor: '#00BDFF',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#00BDFF',
                    fillOpacity: 0.2,
                    map: that.map,
                    center: that.coordinates,
                    radius: that.RADIUS_SIZE
                });
                // load the markers
                that.loadMarkers(that.skateparks, that.coordinates, that.searchValue, radiusSearch);
            });

            const strictBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(48.503867, -11.569082),
                new google.maps.LatLng(61.176357, 2.746907)
            );


            this.map.addListener('dragend', () => {

                if (strictBounds.contains(this.map.getCenter())) { return; }

                const c = this.map.getCenter();
                let xlng = c.lng();
                let ylat = c.lat();
                const maxXlng = strictBounds.getNorthEast().lng();
                const maxYlat = strictBounds.getNorthEast().lat();
                const minXlng = strictBounds.getSouthWest().lng();
                const minYlat = strictBounds.getSouthWest().lat();
                if (xlng < minXlng) { xlng = minXlng; }
                if (xlng > maxXlng) { xlng = maxXlng; }
                if (ylat < minYlat) { ylat = minYlat; }
                if (ylat > maxYlat) { ylat = maxYlat; }

                this.map.setCenter(new google.maps.LatLng(ylat, xlng));
            });
            this.loadMap$.emit(true);

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }


    private loadMarkers(SkateParks: ISkatepark[], startlatlng, searchRequest, radiusBounds) {
        // set marker for search location
        const symbol = {
            fillColor: 'rgb(0, 117, 160)',
            fillOpacity: 1,
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5,
            strokeColor: 'rgb(0, 117, 160)',
            strokeWeight: 1
        };
        // add marker for search location
        const startmarker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: startlatlng,
            title: searchRequest,
            icon: symbol
        });
        /** http://maps.google.com/mapfiles/ms/icons/blue-dot.png */
            // change color of marker
        // const startmarker_infowindow = ' ' + searchRequest + ' ';
        // addInfoWindow(startmarker, startlatlng);
        // console.log('skateparks as our markers', SkateParks);
        for (const park of SkateParks) {
            const center = new google.maps.LatLng(startlatlng.lat, startlatlng.lng);
            const markerPos = new google.maps.LatLng(park.latitude, park.longitude);
            const distance_search_marker = google.maps.geometry.spherical.computeDistanceBetween(center, markerPos);
            if (distance_search_marker <= this.RADIUS_SIZE) {

                const marker = new google.maps.Marker({
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    position: markerPos,
                });

                this.addInfoWindow(marker, park);
            }
        }
    }

    addInfoWindow(marker, record: ISkatepark) {
        const that = this;
        // console.log('record', record);
        const starrating = record.rating;
        let starcontent = '';
        if (starrating > 0) {
            switch (true) {
                case (starrating > 0 && starrating < 1):
                    starcontent = '<i class="ion-ios-star-half"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i>';
                    break;
                case (starrating === 1):
                    starcontent = '<i class="ion-ios-star"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i>';
                    break;
                case (starrating > 1 && starrating < 2):
                    starcontent = '<i class="ion-ios-star"></i><i class="ion-ios-star-half"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i>';
                    break;
                case (starrating === 2):
                    starcontent = '<i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i>';
                    break;
                case (starrating > 2 && starrating < 3):
                    starcontent = '<i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star-half"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i>';
                    break;
                case (starrating === 3):
                    starcontent = '<i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star-outline"></i><i class="ion-ios-star-outline"></i>';
                    break;
                case (starrating > 3 && starrating < 4):
                    starcontent = '<i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star-half"></i><i class="ion-ios-star-outline"></i>';
                    break;
                case (starrating === 4):
                    starcontent = '<i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star-outline"></i>';
                    break;
                case (starrating > 4 && starrating < 5):
                    starcontent = '<i class="ion-ios-star-half"></i><i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star-half"></i>';
                    break;
                case (starrating === 5):
                    starcontent = '<i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star"></i><i class="ion-ios-star"></i>';
                    break;
            }
        } else {
            starcontent = 'no rating';
        }

        const jsoncontent = record.id;
        // console.log('jsoncontent', jsoncontent);
        //region
        const messageContent = `
                <div  data-park="${record.id}">
                    <h4 class="ion-text-uppercase ion-text-center text-15"><ion-text color="dark">${record.name}</ion-text><h4>
                    <h6 class="text-13-300"><ion-text color="dark">${starcontent}</ion-text></h6>
                    <a class="button-small button button-dark button-block">View Details</a>
                </div>`;
        //endregion
        const infoWindow = new google.maps.InfoWindow({
             content: messageContent
         });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(that.map, marker);

            if (messageContent) {
                google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                    document.querySelector(`[data-park="${record.id}"]`).addEventListener('click', async () => {
                        const park = this.skateparks.find(p => p.id === record.id);
                        if (park) {
                            await this._coreStore.setValue(StorageEnum.SELECTED_SKATEPARK, park);
                            await that._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.SKATEPARKS, record.id]);
                        }
                    });
                });
            }
        });
    }

}
