import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal-report-closure',
  templateUrl: './modal-report-closure.component.html',
  styleUrls: ['./modal-report-closure.component.scss'],
})
export class ModalReportClosureComponent implements OnInit {
  form: FormGroup = new FormGroup({
    dateClosure: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(private _modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this._modalController.dismiss();
  }
}
