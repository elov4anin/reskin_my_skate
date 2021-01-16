import {Injectable, NgZone} from "@angular/core";


declare var google;

@Injectable({
    providedIn: "root"
})
export class GoogleMapService {

    constructor(private zone: NgZone) {
    }

    getCoordinates(address: string): Promise<any> {

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
}
