import { Component, OnInit } from '@angular/core';
import {MainLayoutHelper} from "./main-layout.helper";

@Component({
  selector: 'app-mail-layout',
  templateUrl: './mail-layout.component.html',
  styleUrls: ['./mail-layout.component.scss'],
})
export class MailLayoutComponent implements OnInit {


  constructor(
      public mainLayoutHelper: MainLayoutHelper
      ) { }

  ngOnInit() {
  }

  openMenu() {
    this.mainLayoutHelper.menuToggleEmitter$.next(false);
  }
}
