import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {
  @Input() date: string;

  day: number = 27;
  month: string = 'Jul'

  constructor() { }

  ngOnInit() {
   // this.day = 1;
   // this.month = ''
  }

}
