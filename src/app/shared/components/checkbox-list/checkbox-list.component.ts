import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {IFeatureSkatepark} from "../../interfaces/skatepark.interfaces";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxListComponent),
    multi: true
  }]
})
export class CheckboxListComponent implements ControlValueAccessor {
  @Input() checkboxes: IFeatureSkatepark[] = []
  @Input() defaultCheckedColor: string = 'primary'
  @Input() defaultUncheckedColor: string = 'dark'

  @Input()
  set value(val) {
    this._value = val;
    this.onChange(this._value);
  }

  get value() {
    return this._value;
  }

  private _value;


  onChange(_: any) {}

  writeValue(value: any[]) {
    if (value) {
      value.forEach(v => {
        const idx = this.checkboxes.findIndex(btn => btn.value === v);
        if (idx !== -1) {
          this.checkboxes[idx].checked = true;
        }
      })
    }
    this.value ='';
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {}

  change(ch: IFeatureSkatepark) {
    ch.checked = !ch.checked;
    this.value = this.checkboxes.filter(c => c.checked).map(v => v.value);
  }
}
