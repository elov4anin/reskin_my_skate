import {API_URL, DOMAIN} from '../configs/main.config';

export function getEnumAsArray(enumObj): string[] {
    return Object.keys(enumObj).map((key) => enumObj[key]);
}

export function getPhotoPath(picture: string): string {
    return picture.includes(DOMAIN) ? picture : API_URL + '/' + picture;
}

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
