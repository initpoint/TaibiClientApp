import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftSideFilterComponent } from './lift-side-filter.component';

describe('LiftSideFilterComponent', () => {
  let component: LiftSideFilterComponent;
  let fixture: ComponentFixture<LiftSideFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiftSideFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftSideFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
