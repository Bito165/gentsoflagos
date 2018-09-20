import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchManagementComponent } from './merch-management.component';

describe('MerchManagementComponent', () => {
  let component: MerchManagementComponent;
  let fixture: ComponentFixture<MerchManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
