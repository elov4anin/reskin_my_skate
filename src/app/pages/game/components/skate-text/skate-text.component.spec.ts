import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkateTextComponent } from './skate-text.component';

describe('SkateTextComponent', () => {
  let component: SkateTextComponent;
  let fixture: ComponentFixture<SkateTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkateTextComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkateTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
