import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'app-skatepark-detail',
  templateUrl: './skatepark-detail.page.html',
  styleUrls: ['./skatepark-detail.page.scss'],
})
export class SkateparkDetailPage implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  back() {
    this._location.back();
  }
}
