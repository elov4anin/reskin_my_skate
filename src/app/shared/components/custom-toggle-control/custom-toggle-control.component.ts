import {Component, forwardRef, Input} from '@angular/core';
import {IFeatureSkatepark} from "../../interfaces/skatepark.interfaces";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


@Component({
  selector: 'app-custom-toggle-control',
  templateUrl: './custom-toggle-control.component.html',
  styleUrls: ['./custom-toggle-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomToggleControlComponent),
    multi: true
  }]
})
export class CustomToggleControlComponent implements ControlValueAccessor {

  @Input() buttons: IFeatureSkatepark[] = [];
  @Input() intermediateMode: boolean = true;

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

  writeValue(value: any) {
    if (value) {
      const idx = this.buttons.findIndex(btn => btn.value === value);
      if (idx !== -1) {
        this.buttons[idx].checked = true;
      }
    }
    this.value ='';
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched() {}

  clickBtn(btn: IFeatureSkatepark) {
    if (this.intermediateMode && btn.checked) {
        btn.checked = false;
        this.value = '';
        return;
    }
    this.buttons.forEach(btn => btn.checked = false);
    btn.checked = !btn.checked;
    this.value = btn.value;
  }
}
