import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponentsComponent } from './items-components.component';

describe('ItemsComponentsComponent', () => {
  let component: ItemsComponentsComponent;
  let fixture: ComponentFixture<ItemsComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
