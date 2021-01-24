
import {Injectable} from "@angular/core";
import {IAddressWithPostalCode, ICoordinates} from "../interfaces/common";
// @ts-ignore
import GeocoderStatus = google.maps.GeocoderStatus;
import GeocoderResult = google.maps.GeocoderResult;

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

    getAddress(latitude, longitude): Promise<IAddressWithPostalCode> {
        return new Promise((resolve, reject) => {
            const params = {
                location: {
                    lat: latitude,
                    lng: longitude
                }
            }
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(params, (results: GeocoderResult[], status: GeocoderStatus) => {
                if (status === 'OK') {
                    let postalCode:string = '';
                    let address: string = '';
                    const streetAddresses = results.find(r => r.types.includes('street_address'));
                    if (streetAddresses) {
                        address = streetAddresses.formatted_address;
                    }
                    const postalCodeRecord = results.find(r => r.types.includes('postal_code'));
                    if (postalCodeRecord) {
                        const postalCodeResult = postalCodeRecord.address_components.find(r => r.types.includes('postal_code'));
                        postalCode = postalCodeResult.long_name;
                    }
                    resolve({
                        address,
                        postalCode
                    });
                } else {
                    reject(status);
                }
            });
        });
    }
}
