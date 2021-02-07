import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {IPlayer} from '../../interfaces/player.interface';
import {GameService} from '../../services/game.service';
import {IPoint} from '../../interfaces/game.interfaces';

@Component({
    selector: 'app-modal-leaderboard',
    templateUrl: './modal-leaderboard.component.html',
    styleUrls: ['./modal-leaderboard.component.scss'],
})
export class ModalLeaderboardComponent implements OnInit {
    @Input() winner: IPlayer;
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    leaderboard: IPoint[] = [];
    page: number = 0;
    private breakLoadMore: boolean = false;

    constructor(
        private _modalController: ModalController,
        private _gameService: GameService,
    ) {
    }

    ngOnInit() {
        this.getLeaderList();
    }


    getLeaderList() {
        this._gameService.loadLeaderBoard(this.winner ? this.winner.id : '', this.page).subscribe((res) => {
            if (res.leaderboard.length < 20) {
                this.breakLoadMore = true;
                this.infiniteScroll.complete().then();
            } else {
                this.leaderboard = this.leaderboard.concat(res.leaderboard);
                this.page = this.page + 1;
            }
        });

    }

    async closeModal() {
        await this._modalController.dismiss();
    }

    async playAgain() {
        await this._modalController.dismiss({again: true});
    }

    loadData($event: any) {
        if (this.breakLoadMore) {
            $event.target.disabled = true;
            return;
        } else {
            $event.target.disabled = false;
            this.getLeaderList();
        }
    }
}
