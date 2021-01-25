import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {IAddSkateparkParams} from "../../../../shared/interfaces/skatepark.interfaces";
import {SkateparksService} from "../../../../shared/services/skateparks.service";
import {pipe, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ToastNotificationService} from "../../../../shared/helpers/toast-notification.service";

@Component({
  selector: 'app-modal-skatepark-confirm',
  templateUrl: './modal-skatepark-confirm.component.html',
  styleUrls: ['./modal-skatepark-confirm.component.scss'],
})
export class ModalSkateparkConfirmComponent implements OnInit, OnDestroy {
  @Input() candidate: IAddSkateparkParams;

  private componentDestroyed: Subject<any> = new Subject();

  constructor(
      private _modalController: ModalController,
      private _skateParkService: SkateparksService,
      private _toast: ToastNotificationService,
      ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  async closeModal() {
    await this._modalController.dismiss();
  }

  savePark() {
    this._toast.success('Skate park added!').then();
    this._modalController.dismiss(undefined, undefined, 'addSkateparkId').then();
    this._modalController.dismiss({success: true}, undefined, 'addSkateparkConfirmId').then();
    return;
    this._skateParkService.addSkatepark(this.candidate)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe(async (res) => {
          if (res.response_code === '200') {
            await this._toast.success('Skate park added!')
            this._modalController.dismiss(undefined, undefined, 'addSkateparkId').then();
            this._modalController.dismiss({success: true}, undefined, 'addSkateparkConfirmId').then();
          } else {
            await this._toast.success(res.response_msg);
            this._modalController.dismiss({success: true}, undefined, 'addSkateparkConfirmId').then();
          }
        })
  }
}
