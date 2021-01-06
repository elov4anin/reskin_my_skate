import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFilterSkateparksComponent } from './modal-filter-skateparks.component';

describe('ModalFilterSkateparksComponent', () => {
  let component: ModalFilterSkateparksComponent;
  let fixture: ComponentFixture<ModalFilterSkateparksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFilterSkateparksComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFilterSkateparksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
