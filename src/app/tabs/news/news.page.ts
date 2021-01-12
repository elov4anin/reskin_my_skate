import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
