import {IUser} from '../interfaces/auth.interfaces';
import {IGameSettings} from '../interfaces/game';
import {IFeatureSkatepark, ISkatepark} from '../interfaces/skatepark.interfaces';
import {IEvent, IFeedNews} from '../interfaces/team.interfaces';
import {IStore} from '../interfaces/store.interfaces';
import {IPlayer} from '../../tabs/game-tab/interfaces/player.interface';
import {ITrick} from '../../tabs/game-tab/interfaces/game.interfaces';

export class CoreState {

    public readonly profile: IUser;
    public readonly game: IGameSettings;
    public readonly loggedIn: boolean;
    public readonly selectedSkatepark: ISkatepark;
    public readonly skateparkFeatures: IFeatureSkatepark[];
    public readonly selectedNews: IFeedNews;
    public readonly selectedEvent: IEvent;
    public readonly selectedStore: IStore;
    public readonly players: IPlayer[];
    public readonly playersInGame: IPlayer[];
    public readonly tricks: ITrick[];
    public readonly originalTricks: ITrick[];

    constructor() {
        // set initial state
        this.profile = undefined;
        this.game = undefined;
        this.loggedIn = undefined;
        this.selectedSkatepark = undefined;
        this.skateparkFeatures = undefined;
        this.selectedNews = undefined;
        this.selectedEvent = undefined;
        this.selectedStore = undefined;
        this.players = [];
        this.playersInGame = [];
        this.tricks = [];
        this.originalTricks = [];
    }
}
