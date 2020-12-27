import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkateparksPage } from './skateparks.page';

describe('SkateparksPage', () => {
  let component: SkateparksPage;
  let fixture: ComponentFixture<SkateparksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkateparksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkateparksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
