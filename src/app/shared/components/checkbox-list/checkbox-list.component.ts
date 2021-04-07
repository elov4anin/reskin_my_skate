import {Component, forwardRef, Input} from '@angular/core';
import {IFeatureSkatepark} from '../../interfaces/skatepark.interfaces';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
  @Input()
  set checkboxes(val: IFeatureSkatepark[]) {
    this._checkboxes = val;
   // if (!val.map(v => v.checked).includes(true)) {
   //   this.value = [];
   // }
  }

  get checkboxes(){
    return this._checkboxes;
  }

  @Input() disableBtns: boolean = false;
  @Input() defaultCheckedColor: string = 'primary';
  @Input() defaultUncheckedColor: string = 'dark';

  @Input()
  set value(val) {
    this._value = val;
    this.onChange(this._value);
  }

  get value() {
    return this._value;
  }

  private _value = [];
  private _checkboxes: IFeatureSkatepark[] = [];

  onChange(_: any) {}
  onTouched = () => {};

  writeValue(value: any[]) {
    this.value = value && value.length > 0 ?  value : [];
  //  console.log('writeValue 1', value);
  //  if (value && value.length > 0) {
  //    console.log('writeValue', value);
  //    value.forEach(v => {
  //      const idx = this.checkboxes.findIndex(btn => btn.value === v);
  //      this.checkboxes[idx].checked = idx !== -1;
  //    });
  //  } else {
  //    this.value = [];
  //   //  this.checkboxes.forEach(ch => ch.checked = false);
  //  }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  change(ch: IFeatureSkatepark) {
    ch.checked = !ch.checked;
    if (ch.checked) {
      console.log('ch', ch);
      this.value.push(ch.value);
    } else {
      this.value = this.value.filter(v => v !== ch.value);
    }
    console.log(this.value);
    this.writeValue(this.value);
   // ch.checked = !ch.checked;
    // this.value = this.checkboxes.filter(c => c.checked).map(v => v.value);
  }
}
