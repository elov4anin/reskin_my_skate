import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkateparkDetailPage } from './skatepark-detail.page';

describe('SkateparkDetailPage', () => {
  let component: SkateparkDetailPage;
  let fixture: ComponentFixture<SkateparkDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkateparkDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkateparkDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
