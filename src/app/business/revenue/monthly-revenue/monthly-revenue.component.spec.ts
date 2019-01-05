import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRevenueComponent } from './monthly-revenue.component';

describe('MonthlyRevenueComponent', () => {
  let component: MonthlyRevenueComponent;
  let fixture: ComponentFixture<MonthlyRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
