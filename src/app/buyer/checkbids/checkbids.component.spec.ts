import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbidsComponent } from './checkbids.component';

describe('CheckbidsComponent', () => {
  let component: CheckbidsComponent;
  let fixture: ComponentFixture<CheckbidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckbidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
