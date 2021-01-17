import {Component, Input, OnInit} from '@angular/core';
import {IFeatureSkatepark} from "../../interfaces/skatepark.interfaces";

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
})
export class CheckboxListComponent implements OnInit {
  @Input() checkboxes: IFeatureSkatepark[] = []
  @Input() defaultCheckedColor: string = 'primary'
  @Input() defaultUncheckedColor: string = 'dark'
  constructor() { }

  ngOnInit() {}

  change(ch: IFeatureSkatepark) {
    ch.checked = !ch.checked;
  }
}
