import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-news-list',
  templateUrl: './team-news-list.component.html',
  styleUrls: ['./team-news-list.component.scss'],
})
export class TeamNewsListComponent implements OnInit {
  items: any[] = [
    {
      imgSrc: 'assets/images/teams/news.png',
      name: 'Team GB',
      text: 'Check out this insane trick!',
      isVideo: false
    },
    {
      imgSrc: 'assets/images/teams/news.png',
      name: 'Team GB',
      text: 'Ten tips to become a better skater',
      isVideo: true
    },
  ];

  constructor() { }

  ngOnInit() {}

}
