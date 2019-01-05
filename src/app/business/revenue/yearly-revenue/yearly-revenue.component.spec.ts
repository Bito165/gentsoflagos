import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyRevenueComponent } from './yearly-revenue.component';

describe('YearlyRevenueComponent', () => {
  let component: YearlyRevenueComponent;
  let fixture: ComponentFixture<YearlyRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
