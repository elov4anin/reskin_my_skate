import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
})
export class CheckboxListComponent implements OnInit {
  @Input() checkboxes: ICheckBox[] = []
  @Input() defaultCheckedColor: string = 'primary'
  @Input() defaultUncheckedColor: string = 'dark'
  constructor() { }

  ngOnInit() {}

  change(ch: ICheckBox) {
    ch.checked = !ch.checked;
  }
}

export interface ICheckBox {
  label: string;
  checked: boolean
}
