import {IUser} from "../interfaces/auth.interfaces";
import {IGameSettings} from "../interfaces/game";
import {IFeatureSkatepark, ISkatepark} from "../interfaces/skatepark.interfaces";
import {IFeedNews} from "../interfaces/team.interfaces";

export class CoreState {

    public readonly profile: IUser;
    public readonly game: IGameSettings;
    public readonly loggedIn: boolean;
    public readonly selectedSkatepark: ISkatepark;
    public readonly skateparkFeatures: IFeatureSkatepark[];
    public readonly selectedNews: IFeedNews;


    constructor() {
        // set initial state
        this.profile = undefined;
        this.game = undefined;
        this.loggedIn = undefined;
        this.selectedSkatepark = undefined;
        this.skateparkFeatures = undefined;
        this.selectedNews = undefined;
    }
}
