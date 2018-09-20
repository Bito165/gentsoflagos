import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyApplicationsComponent } from './academy-applications.component';

describe('AcademyApplicationsComponent', () => {
  let component: AcademyApplicationsComponent;
  let fixture: ComponentFixture<AcademyApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademyApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
