import { UtilsService } from './../../services/utils.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

class LinkedDeque {
  constructor(data: number, left: LinkedDeque, right: LinkedDeque) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
  data: number;
  left: LinkedDeque;
  right: LinkedDeque;
}

class Deque implements Iterable<LinkedDeque> {
  head: LinkedDeque;
  tail: LinkedDeque;

  public get size(): number {
    return [...this].length - 1;
  }

  private *iter() {
    let current = this.head;
    if (!current) return;

    yield current;
    while(current = current?.right) {
      yield current;
    }
  }
  [Symbol.iterator](): Iterator<LinkedDeque, any, undefined> {
    return this.iter();
  }
}

@Component({
  selector: 'app-linked-list-deque',
  templateUrl: './linked-list-deque.component.html',
  styleUrls: ['./linked-list-deque.component.css']
})
export class LinkedListDequeComponent {
  deque: Deque;
  item = 0;
  removed: number;
  @ViewChild('queue') view: ElementRef<SVGElement>;
  root: d3.Selection<SVGGElement, unknown, null, undefined>;

  constructor(public util: UtilsService) {}
  ngAfterViewInit(): void {
    this.root = d3
      .select(this.view.nativeElement)
      .append('g')
      .attr('transform', `translate(${0}, ${0})`);
  }

  updateView() {
    const data = this.deque;
    this.root
      .selectAll('rect.outter')
      .data(data)
      .join('rect')
      .attr('class', 'outter')
      .attr('x', (d, i) => i * 30)
      .attr('y', 50)
      .attr('width', 40)
      .attr('height', 20)
      .attr('transform', (d, i) => `translate(${i * 60}, 0)`)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)

    this.root
      .selectAll('text')
      .data(data)
      .join('text')
      .text(d => d?.data)
      .attr('x', (d, i) => 15 + i * 90)
      .attr('y', 60)

    this.root
      .selectAll('.arrow')
      .data(data)
      .join('text')
      .filter((d, i) => i == 0 || i == data.size)
      .text((d, i) => i ? 'head' : 'tail')
      .attr('x', (d, i) => i ? 0 : (data.size * 90))
      .attr('y', 90)
  }

  init() {
    this.deque = new Deque();
    this.item = 0;
    this.removed = undefined;
  }

  isEmpty(node: LinkedDeque) {
    return !!!node;
  }

  // front == head
  // rear == tail
  enqueue_front(data) {
    if (!this.deque) return alert('초기화 후 사용');
    const newNode = new LinkedDeque(data, undefined, this.deque.head);
    if (this.isEmpty(this.deque.head)) {
      this.deque.tail = newNode;
    } else {
      this.deque.head.left = newNode;
    }
    this.deque.head = newNode;
    ++this.item;
  }

  dequeue_front() {
    if (!this.deque) return alert('초기화 후 사용');
    if (this.isEmpty(this.deque.head)) return alert('남은 head가 없음');

    const data = this.deque.head.data;
    const right = this.deque.head.right;
    delete this.deque.head;
    this.deque.head = right;
    if (!this.deque.head) {
      this.deque.tail = undefined;
    } else {
      this.deque.head.left = undefined;
    }
    return data;
  }

  enqueue_rear(data) {
    if (!this.deque) return alert('초기화 후 사용');
    const newNode = new LinkedDeque(data, this.deque.tail, undefined);
    if (this.isEmpty(this.deque.tail)) {
      this.deque.head = newNode;
    } else {
      this.deque.tail.right = newNode;
    }
    this.deque.tail = newNode;
    ++this.item;
  }

  dequeue_rear() {
    if (!this.deque) return alert('초기화 후 사용');
    if (this.isEmpty(this.deque.tail)) return alert('남은 tail이 없음');

    const data = this.deque.tail.data;
    const left = this.deque.tail.left;
    delete this.deque.tail;
    this.deque.tail = left;
    if (!this.deque.tail) {
      this.deque.head = undefined;
    } else {
      this.deque.tail.right = undefined;
    }
    return data;
  }
}
