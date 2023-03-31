import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearQueueComponent } from './linear-queue.component';

describe('LinearQueueComponent', () => {
  let component: LinearQueueComponent;
  let fixture: ComponentFixture<LinearQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinearQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
