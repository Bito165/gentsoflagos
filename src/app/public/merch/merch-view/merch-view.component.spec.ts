import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchViewComponent } from './merch-view.component';

describe('MerchViewComponent', () => {
  let component: MerchViewComponent;
  let fixture: ComponentFixture<MerchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
