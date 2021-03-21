import {API_URL, DOMAIN} from '../configs/main.config';
import {ISlideInfo} from '../../tabs/skateparks/skateparks.interfaces';

export function getEnumAsArray(enumObj): string[] {
    return Object.keys(enumObj).map((key) => enumObj[key]);
}

export function getPhotoPath(picture: string): string {
    return picture.includes(DOMAIN) ? picture : API_URL + '/' + picture;
}

export function capitalizeFirstLetter(str): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getSlides(images: string[]): ISlideInfo[] {
    return  images.map(imgSrc => {
        return {
            imgSrc
        };
    });
}

export function getLinksFromSlides(slides: ISlideInfo[]): string[] {
    return slides.map(s => s.imgSrc);
}
