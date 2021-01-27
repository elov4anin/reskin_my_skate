import {ISlideInfo} from "../skateparks.interfaces";
import {ISkatepark} from "../../../shared/interfaces/skatepark.interfaces";
import {TRUE_VALUE} from "../../../shared/configs/main.config";
import {getEnumAsArray} from "../../../shared/helpers/utils";

export enum FeaturesSkateparkEnum {
    TOILET= 'toilet',
    STORE = 'store',
    PAID = 'paid',
    FREE = 'free',
    UNDERCOVER = 'undercover',
    CAFE = 'cafe',
    LIGHTING = 'lighting',
    LOCKER = 'locker',
    RELAXING_AREA = 'relaxing_area',
    VIEWING_AREA = 'viewing_area',
}

const FeaturesSkatepark = getEnumAsArray(FeaturesSkateparkEnum);

export const featuresSlides: ISlideInfo[] = [
    {
        title: "Lightning",
        imgSrc: "/assets/images/features_icons/lightning.svg",
        type: FeaturesSkateparkEnum.LIGHTING
    },
    {
        title: "Cafe",
        imgSrc: "/assets/images/features_icons/cafe.svg",
        type: FeaturesSkateparkEnum.CAFE
    },
    {
        title: "Locker",
        imgSrc: "/assets/images/features_icons/lock.svg",
        type: FeaturesSkateparkEnum.LOCKER
    },
    {
        title: "Paid",
        imgSrc: "/assets/images/features_icons/paid.svg",
        type: FeaturesSkateparkEnum.PAID
    },
    {
        title: "Store",
        imgSrc: "/assets/images/features_icons/store.svg",
        type: FeaturesSkateparkEnum.STORE
    },
    {
        title: "Free",
        imgSrc: "/assets/images/features_icons/free.svg",
        type: FeaturesSkateparkEnum.FREE
    },
    {
        title: "Undercover",
        imgSrc: "/assets/images/features_icons/secret.svg",
        type: FeaturesSkateparkEnum.UNDERCOVER
    },
    {
        title: "Toilet",
        imgSrc: "/assets/images/features_icons/wc.svg",
        type: FeaturesSkateparkEnum.TOILET
    },
    {
        title: "Relaxing area",
        imgSrc: "/assets/images/features_icons/relax.svg",
        type: FeaturesSkateparkEnum.RELAXING_AREA
    },
    {
        title: "Viewing area",
        imgSrc: "/assets/images/features_icons/view.svg",
        type: FeaturesSkateparkEnum.VIEWING_AREA
    },
];


export function prepareFeatures(skatepark: ISkatepark) {
    let slides: ISlideInfo[] = [];
    Object.keys(skatepark).forEach(skateparkKey => {
        if (checkFeature(skateparkKey, skatepark)) {
            slides = slides.concat(featuresSlides.filter(f => f.type === skateparkKey))
        }
    })
    return slides
}

export function addOutdoorsToFeatures(skatepark: ISkatepark, slides: ISlideInfo[]) {
    if (skatepark.outdoors === TRUE_VALUE) {
        slides.push({
            title: "Outdoors",
            imgSrc: "/assets/images/features_icons/outside.svg",
            type: 'outdoors'
        })
    }
    if (skatepark.indoors === TRUE_VALUE) {
        slides.push({
            title: "Indoors",
            imgSrc: "/assets/images/features_icons/inside.svg",
            type: 'indoors'
        })
    }
    return slides
}

function checkFeature(key: string, skatepark: ISkatepark) {
    return FeaturesSkatepark.includes(key) && skatepark[key] === TRUE_VALUE;
}
