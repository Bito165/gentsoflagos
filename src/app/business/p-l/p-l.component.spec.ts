import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PLComponent } from './p-l.component';

describe('PLComponent', () => {
  let component: PLComponent;
  let fixture: ComponentFixture<PLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
