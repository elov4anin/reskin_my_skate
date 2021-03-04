import {IUser} from '../interfaces/auth.interfaces';
import {IGameSettings} from '../interfaces/game';
import {IFeatureSkatepark, ISkatepark} from '../interfaces/skatepark.interfaces';
import {IEvent, IFeedNews} from '../interfaces/team.interfaces';
import {IPlayer} from '../../pages/game/interfaces/player.interface';
import {ITrick} from '../../pages/game/interfaces/game.interfaces';

export class CoreState {

    public readonly profile: IUser;
    public readonly game: IGameSettings;
    public readonly loggedIn: boolean;
    public readonly selectedSkatepark: ISkatepark;
    public readonly skateparkFeatures: IFeatureSkatepark[];
    public readonly selectedNews: IFeedNews;
    public readonly selectedEvent: IEvent;
    public readonly players: IPlayer[];
    public readonly playersInGame: IPlayer[];
    public readonly tricks: ITrick[];
    public readonly originalTricks: ITrick[];
    public readonly selectedDifficulty: number;
    public readonly currentTrick: ITrick;
    public readonly gamePlayers: IPlayer[];
    public readonly selectedTrickTypes: string[];

    constructor() {
        // set initial state
        this.profile = undefined;
        this.game = undefined;
        this.loggedIn = undefined;
        this.selectedSkatepark = undefined;
        this.skateparkFeatures = undefined;
        this.selectedNews = undefined;
        this.selectedEvent = undefined;
        // game
        this.players = [];
        this.playersInGame = [];
        this.tricks = [];
        this.originalTricks = [];
        this.selectedDifficulty = undefined;
        this.currentTrick = undefined;
        this.gamePlayers = [];
        this.selectedTrickTypes = [];
    }
}
