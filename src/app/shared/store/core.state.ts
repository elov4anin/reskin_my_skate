import {IUser} from "../interfaces/auth.interfaces";
import {IGameSettings} from "../interfaces/game";
import {IFeatureSkatepark, ISkatepark} from "../interfaces/skatepark.interfaces";

export class CoreState {

    public readonly profile: IUser;
    public readonly game: IGameSettings;
    public readonly loggedIn: boolean;
    public readonly selectedSkatepark: ISkatepark;
    public readonly skateparkFeatures: IFeatureSkatepark[];


    constructor() {
        // set initial state
        this.profile = undefined;
        this.game = undefined;
        this.loggedIn = undefined;
        this.selectedSkatepark = undefined;
        this.skateparkFeatures = undefined;
    }
}
