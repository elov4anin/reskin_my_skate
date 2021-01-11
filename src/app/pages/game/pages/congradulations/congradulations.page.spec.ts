import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CongradulationsPage } from './congradulations.page';

describe('CongradulationsPage', () => {
  let component: CongradulationsPage;
  let fixture: ComponentFixture<CongradulationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongradulationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CongradulationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
