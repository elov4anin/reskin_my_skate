import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchSkateparksPage } from './search-skateparks.page';

describe('SearchSkateparksPage', () => {
  let component: SearchSkateparksPage;
  let fixture: ComponentFixture<SearchSkateparksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSkateparksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchSkateparksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
