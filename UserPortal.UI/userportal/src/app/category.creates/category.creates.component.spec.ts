import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreatesComponent } from './category.creates.component';

describe('CategoryCreatesComponent', () => {
  let component: CategoryCreatesComponent;
  let fixture: ComponentFixture<CategoryCreatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCreatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCreatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
