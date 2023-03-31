import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularQueueComponent } from './circular-queue.component';

describe('CircularQueueComponent', () => {
  let component: CircularQueueComponent;
  let fixture: ComponentFixture<CircularQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircularQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
