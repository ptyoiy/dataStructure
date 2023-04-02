import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedListDequeComponent } from './linked-list-deque.component';

describe('LinkedListDequeComponent', () => {
  let component: LinkedListDequeComponent;
  let fixture: ComponentFixture<LinkedListDequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedListDequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedListDequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
