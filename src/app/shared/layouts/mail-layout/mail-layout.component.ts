import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {MainLayoutHelper} from "./main-layout.helper";

@Component({
  selector: 'app-mail-layout',
  templateUrl: './mail-layout.component.html',
  styleUrls: ['./mail-layout.component.scss'],
})
export class MailLayoutComponent implements OnInit {
  @Input() isNeedRightPadding: boolean = true;
  @Input() isNeedLeftPadding: boolean = true;
  @Input() isNotNeedPaddingTopHeader: boolean = false;
  @Input() isNeedHeightWithTabsAndHeader: boolean = false;

  @Input() footerSlot: TemplateRef<any>;


  constructor(
      public mainLayoutHelper: MainLayoutHelper
      ) { }

  ngOnInit() {
  }

  openMenu() {
    this.mainLayoutHelper.menuToggleEmitter$.next(false);
  }
}
