import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalSkateparkConfirmComponent } from './modal-skatepark-confirm.component';

describe('ModalSkateparkConfirmComponent', () => {
  let component: ModalSkateparkConfirmComponent;
  let fixture: ComponentFixture<ModalSkateparkConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSkateparkConfirmComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSkateparkConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
