import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalAddSkateparkComponent } from './modal-add-skatepark.component';

describe('ModalAddSkateparkComponent', () => {
  let component: ModalAddSkateparkComponent;
  let fixture: ComponentFixture<ModalAddSkateparkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddSkateparkComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAddSkateparkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
