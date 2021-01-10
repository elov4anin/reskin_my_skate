import {Component, Input, OnInit} from '@angular/core';
import {IDifficulty} from "../difficulty.interface";

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.scss'],
})
export class DifficultyComponent implements OnInit {
  @Input() difficulty: IDifficulty;

  constructor() { }

  ngOnInit() {}

}

