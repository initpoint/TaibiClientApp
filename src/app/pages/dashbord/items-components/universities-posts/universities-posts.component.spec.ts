import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitiesPostsComponent } from './universities-posts.component';

describe('UniversitiesPostsComponent', () => {
  let component: UniversitiesPostsComponent;
  let fixture: ComponentFixture<UniversitiesPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitiesPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitiesPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
