import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrickPage } from './trick.page';

describe('TrickPage', () => {
  let component: TrickPage;
  let fixture: ComponentFixture<TrickPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrickPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrickPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
