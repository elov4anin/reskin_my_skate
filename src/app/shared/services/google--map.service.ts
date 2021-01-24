import {Injectable} from "@angular/core";
import {ICoordinates} from "../interfaces/common";


declare var google;

@Injectable({
    providedIn: "root"
})
export class GoogleMapService {

    constructor() {
    }

    getCoordinates(address: string): Promise<ICoordinates> {

        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({address}, (results, status) => {
                if (status === 'OK') {
                    resolve({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                } else {
                    reject(status);
                }
            });
        });
    }

    getAddress(latitude, longitude) {
        return new Promise((resolve, reject) => {
            const params = {
                location: {
                    lat: latitude,
                    lng: longitude
                }
            }
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(params, (results, status) => {
                if (status === 'OK') {
                    console.log('results', results)
                    resolve({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                } else {
                    reject(status);
                }
            });
        });
    }
}
