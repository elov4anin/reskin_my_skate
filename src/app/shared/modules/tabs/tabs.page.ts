import {Component, ViewChild} from '@angular/core';
import {TabsEnum, tabsEnum2IconActiveMapping, tabsEnum2IconMapping, tabsEnum2RouteMapping} from "./tabs.enum";
import {getEnumAsArray} from "../../helpers/utils";
import {IonTabs} from "@ionic/angular";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild('tabsRef') tabsRef: IonTabs;

  tabs: { tabName: string; current: boolean }[] = getEnumAsArray(TabsEnum).map((t) => {
    return {
      tabName: t,
      current: false
    }
  });
  selectedTab: string;

  readonly tabsEnum2RouteMapping = tabsEnum2RouteMapping;
  readonly tabsEnum2IconMapping = tabsEnum2IconMapping;
  readonly tabsEnum2IconActiveMapping = tabsEnum2IconActiveMapping;

  constructor() {
  }

  setCurrentTab() {
    this.selectedTab = this.tabsRef.getSelected();
    if (this.selectedTab) {
      const idx = this.tabs.findIndex( t => t.tabName.toLowerCase() === this.selectedTab);
      this.tabs.forEach(t => t.current = false);
      this.tabs[idx].current = true;
    }
  }
}
