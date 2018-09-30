import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskforuserComponent } from './taskforuser.component';

describe('TaskforuserComponent', () => {
  let component: TaskforuserComponent;
  let fixture: ComponentFixture<TaskforuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskforuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskforuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
