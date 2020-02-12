import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsSecComponent } from './tags-sec.component';

describe('TagsSecComponent', () => {
  let component: TagsSecComponent;
  let fixture: ComponentFixture<TagsSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
