import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {FeedbackService} from '../../../../shared/services/feedback.service';
import {takeUntil} from 'rxjs/operators';
import {forkJoin, Subject} from 'rxjs';
import {ISkatepark} from '../../../../shared/interfaces/skatepark.interfaces';
import {IFeedback} from '../../../../shared/interfaces/feedback.interfaces';
import {CoreStore} from '../../../../shared/store/core.store';
import {ToastNotificationService} from '../../../../shared/helpers/toast-notification.service';
import {IServerResponse} from '../../../../shared/interfaces/common';

@Component({
    selector: 'app-modal-ratings',
    templateUrl: './modal-ratings.component.html',
    styleUrls: ['./modal-ratings.component.scss'],
})
export class ModalRatingsComponent implements OnInit, OnDestroy {
    @Input() park: ISkatepark;
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    readonly defaultRatingColor: string = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-light');
    readonly activeRatingColor: string = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-secondary');
    private componentDestroyed: Subject<any> = new Subject();

    private page: number = 0;
    private feed: IFeedback[] = [];
    private breakLoadMore: boolean = false;
    private userId: string;

    comment: string;
    newRating: number;
    isCommentedThisUser: boolean;
    yourRating: IFeedback;
    userRatings: IFeedback[] = [];

    constructor(
        private _modalController: ModalController,
        private _feedbackService: FeedbackService,
        private _coreStore: CoreStore,
        private _toast: ToastNotificationService,
    ) {
    }

    ngOnInit() {
        this.userId = this._coreStore.state.profile.id;
        this.getFeed();
    }

    ngOnDestroy(): void {
        this.componentDestroyed.next();
        this.componentDestroyed.unsubscribe();
    }

    async closeModal() {
        await this._modalController.dismiss();
    }

    getFeed() {
        this._feedbackService.getFeedbackListByParkId(this.park.id, this.page)
            .pipe(takeUntil(this.componentDestroyed))
            .subscribe(async (res) => {
                if (res.feed.length === 0) {
                    this.breakLoadMore = true;
                    this.infiniteScroll.complete().then();
                }
                this.feed = this.feed.concat(res.feed);
                this.userRatings = this.feed.filter(f => f.user_id !== this.userId);
                this.isCommentedThisUser = this.feed.map(f => f.user_id).includes(this.userId);
                this.yourRating = this.feed.find(f => f.user_id === this.userId);
                this.page = this.page + 1;
            });
    }

    loadData($event: any) {
        if (this.breakLoadMore) {
            $event.target.disabled = true;
            return;
        } else {
            this.getFeed();
        }
    }

    sendRating() {
        const observers = [];
        if (this.newRating) {
            observers.push(
                this._feedbackService.addRating({
                    park: this.park.id,
                    rating: this.newRating,
                    user:  this.userId
                })
            );
        }

        if (this.comment) {
            observers.push(
                this._feedbackService.addFeed({
                    park: this.park.id,
                    post: this.comment,
                    type: 'post',
                    user:  this.userId
                })
            );
        }

        forkJoin([...observers]).subscribe((res: IServerResponse[]) => {
            let text: string;
            if (!res[0].success) {
                text = res[0].response_msg;
            } else {
                text = 'Rating added. ';
            }
            if (!res[1].success) {
                text = text + res[1].response_msg;
            } else {
                text = 'Post added. ';
            }
            this._toast.info(text).then();
            this.page = 0;
            this.getFeed();
        });
    }
}
