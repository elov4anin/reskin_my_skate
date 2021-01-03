import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSpotBoardComponent } from './add-spot-board.component';

describe('AddSpotBoardComponent', () => {
  let component: AddSpotBoardComponent;
  let fixture: ComponentFixture<AddSpotBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpotBoardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSpotBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
