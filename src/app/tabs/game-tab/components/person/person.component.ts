import {Component, Input, OnInit} from '@angular/core';
import {IPlayer} from '../../interfaces/player.interface';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  @Input() player: IPlayer;

  constructor() { }

  ngOnInit() {}

}
