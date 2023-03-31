import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackLinkedListComponent } from './stack-linked-list.component';

describe('StackLinkedListComponent', () => {
  let component: StackLinkedListComponent;
  let fixture: ComponentFixture<StackLinkedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackLinkedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackLinkedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
