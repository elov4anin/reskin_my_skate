import {Injectable} from "@angular/core";
import {ISkateparkFilterParams} from "../../../shared/interfaces/skatepark.interfaces";
import {ReplaySubject} from "rxjs";


@Injectable({
    providedIn: "root"
})
export class FilterSkateparksHelper {

   defaultFilterState: ISkateparkFilterParams = {
        type: null,
        features: [],
        location: '',
        material: null,
        page: 0,
    }
    filterChange$: ReplaySubject<ISkateparkFilterParams> = new ReplaySubject<ISkateparkFilterParams>(1);

    constructor() {
    }

    checkFilterActive(filter: ISkateparkFilterParams): boolean {
        return !!(filter.material || filter.features.length > 0 || filter.type);
    }

}
