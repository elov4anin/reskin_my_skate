import {IUser} from "../interfaces/auth.interfaces";
import {IGameSettings} from "../interfaces/game";

export class CoreState {

    public readonly profile: IUser;
    public readonly game: IGameSettings;
    public readonly loggedIn: boolean;


    constructor() {
        // set initial state
        this.profile = undefined;
        this.game = undefined;
        this.loggedIn = undefined
    }
}
