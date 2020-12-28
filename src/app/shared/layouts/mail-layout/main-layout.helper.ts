import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class MainLayoutHelper {
    menuToggleEmitter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}
