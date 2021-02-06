import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {IPlayer} from '../../../../pages/game/interfaces/player.interface';
import {API_URL, NO_PICTURE_USER} from '../../../../shared/configs/main.config';
import {CoreStore} from '../../../../shared/store/core.store';
import {uuid4} from '@capacitor/core/dist/esm/util';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VALIDATION_MESSAGES} from '../../../../shared/classes/validation-messages';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {PlayersService} from '../../../../pages/game/services/players.service';
import {ToastNotificationService} from '../../../../shared/helpers/toast-notification.service';

@Component({
    selector: 'app-modal-add-players',
    templateUrl: './modal-add-players.component.html',
    styleUrls: ['./modal-add-players.component.scss'],
})
export class ModalAddPlayersComponent implements OnInit, OnDestroy {
    @Input() players: IPlayer[] = [];

    userId: string;
    otherPlayerName: string;
    showEmailInput: boolean;

    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
    });

    readonly validationMessages = VALIDATION_MESSAGES;

    private componentDestroyed: Subject<any> = new Subject();

    constructor(
        private _modalController: ModalController,
        private _coreStore: CoreStore,
        private _playersService: PlayersService,
        private _toast: ToastNotificationService,
    ) {
    }

    ngOnInit() {
        this.userId = this._coreStore.state.profile.id;
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    async closeModal() {
        await this._modalController.dismiss();
    }

    removePlayer(playerId: string) {
        this.players = this.players.filter(p => p.id !== playerId);
    }

    addPlayer() {
        const player: IPlayer = {
            id: uuid4(),
            name: this.otherPlayerName,
            picture: API_URL + NO_PICTURE_USER,
            email: '',
            username: '',
            linked: false
        };

        this.players.push(player);
    }

    async savePlayers() {
        await this._modalController.dismiss({
            players: this.players
        });
    }

    showProfile() {
        this.showEmailInput = !this.showEmailInput;

    }

    addLinkedPlayer() {
        if (this.form.invalid) {
            return;
        }
        this._playersService.playerSearch(this.form.value.email)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(players => {
                if (players.length > 0) {
                    this.players.push(players[0]);
                    this.form.reset();
                    this.showProfile();
                } else {
                    this._toast.info('Not found user').then();
                }
            });
    }
}
