import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUserComponent } from './task-user.component';

describe('TaskUserComponent', () => {
  let component: TaskUserComponent;
  let fixture: ComponentFixture<TaskUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskUserComponent]
    });
    fixture = TestBed.createComponent(TaskUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
