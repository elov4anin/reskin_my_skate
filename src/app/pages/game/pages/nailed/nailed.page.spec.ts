import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NailedPage } from './nailed.page';

describe('NailedPage', () => {
  let component: NailedPage;
  let fixture: ComponentFixture<NailedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NailedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
