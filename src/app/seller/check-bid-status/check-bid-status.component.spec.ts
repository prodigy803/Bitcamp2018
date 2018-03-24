import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBidStatusComponent } from './check-bid-status.component';

describe('CheckBidStatusComponent', () => {
  let component: CheckBidStatusComponent;
  let fixture: ComponentFixture<CheckBidStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBidStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBidStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
