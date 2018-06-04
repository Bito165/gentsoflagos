import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheShopComponent } from './the-shop.component';

describe('TheShopComponent', () => {
  let component: TheShopComponent;
  let fixture: ComponentFixture<TheShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
