import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent {
  @Input() set date(date: string) {
    const dateAsList = date.split(' ');
    this.day = dateAsList[1];
    this.month = dateAsList[0];
  }

  day: string;
  month: string;
}
