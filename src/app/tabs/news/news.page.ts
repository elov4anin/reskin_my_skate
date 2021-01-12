import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TABS_MAIN_ROUTE, tabsEnum2RouteMapping} from "../tabs.enum";

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  items: any[] = [
    {
      imgSrc: 'assets/images/teams/news.png',
      name: 'Check out this insane trick!',
      text: 'We just need your registered email address to send you password reset instructions',
    },
    {
      imgSrc: 'assets/images/teams/news.png',
      name: 'Ten tips to become a better skater',
      text: 'We just need your registered email address to send you…',
    },
  ];
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  async openNews(newsId: number) {
    await this._router.navigate(['/', TABS_MAIN_ROUTE, tabsEnum2RouteMapping.NEWS, newsId])
  }
}
