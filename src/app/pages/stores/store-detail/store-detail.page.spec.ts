import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreDetailPage } from './store-detail.page';

describe('StoreDetailPage', () => {
  let component: StoreDetailPage;
  let fixture: ComponentFixture<StoreDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
