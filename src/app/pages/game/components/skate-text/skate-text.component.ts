import {Component, Input, OnInit} from '@angular/core';
import {IPlayer} from '../../interfaces/player.interface';

@Component({
  selector: 'app-skate-text',
  templateUrl: './skate-text.component.html',
  styleUrls: ['./skate-text.component.scss'],
})
export class SkateTextComponent {
  @Input() player: IPlayer;
}
