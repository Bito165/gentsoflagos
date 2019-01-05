import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyRevenueComponent } from './weekly-revenue.component';

describe('WeeklyRevenueComponent', () => {
  let component: WeeklyRevenueComponent;
  let fixture: ComponentFixture<WeeklyRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
