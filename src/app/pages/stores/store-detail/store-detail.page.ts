import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage implements OnInit {

  constructor(private _location: Location,) { }

  ngOnInit() {
  }
  back() {
    this._location.back();
  }
}
