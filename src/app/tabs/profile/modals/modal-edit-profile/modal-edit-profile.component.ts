import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss'],
})
export class ModalEditProfileComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl('Mike', [Validators.required]),
    lastName: new FormControl('Johanssen', [Validators.required]),
    date: new FormControl('June 28, 1989', [Validators.required]),
    location: new FormControl('', [Validators.required]),
  });

  constructor(private _modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this._modalController.dismiss();
  }
}
