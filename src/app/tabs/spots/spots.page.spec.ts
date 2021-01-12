import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpotsPage } from './spots.page';

describe('SpotsPage', () => {
  let component: SpotsPage;
  let fixture: ComponentFixture<SpotsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
