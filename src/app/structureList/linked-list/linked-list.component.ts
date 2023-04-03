import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import * as d3 from 'd3';
import { UtilsService } from 'src/app/services/utils.service';

class Node {
  data: number;
  next: Node;
  constructor(data: number, next: Node) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList implements Iterable<[Node, number]> {
  head: Node;

  public get size(): number {
    return [...this].length;
  }

  *iter(): Generator<[Node, number], any, undefined> {
    let current = this.head;
    let idx = 0;
    if (!current) return;
    do {
      yield [current, idx++];
    } while ((current = current?.next));
  }
  [Symbol.iterator](): Iterator<[Node, number], any, undefined> {
    return this.iter();
  }
}

@Component({
  selector: 'app-linked-list',
  templateUrl: './linked-list.component.html',
  styleUrls: ['./linked-list.component.css'],
})
export class LinkedListComponent implements AfterViewInit {
  list: LinkedList;
  item: number;
  removed: number;
  inputPos = 0;
  inputDeletePos = 0;
  searchValue: number;
  @ViewChild('list') view: ElementRef<SVGElement>;
  @ViewChildren('input') inputs: QueryList<ElementRef<HTMLInputElement>>;
  root: d3.Selection<SVGGElement, unknown, null, undefined>;

  constructor(public util: UtilsService) {}

  ngAfterViewInit(): void {
    this.root = d3
      .select(this.view.nativeElement)
      .append('g')
      .attr('transform', `translate(${0}, ${0})`);
  }

  updateView() {
    this.inputs.forEach(({ nativeElement }) => {
      nativeElement.max = this.list.size - 1 + '';
    });
    this.inputPos = this.list.size;
    this.inputDeletePos = this.list.size - 1;
    const data = this.list;
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
      .attr('stroke-width', 1);

    this.root
      .selectAll('text')
      .data(data)
      .join('text')
      .text((d) => d?.[0]?.data)
      .attr('x', (d, i) => 15 + i * 90)
      .attr('y', 60);
  }
  init() {
    this.list = new LinkedList();
    this.item = 0;
    this.removed = undefined;
  }

  isEmpty() {
    return !this.list.head;
  }

  insertFirst(value: number) {
    if (!this.list) return alert('초기화 후 사용');
    const newNode = new Node(value, undefined);
    if (this.isEmpty()) {
      this.list.head = newNode;
    } else {
      const prevHead = this.list.head;
      this.list.head = newNode;
      this.list.head.next = prevHead;
    }

    ++this.item;
    return true;
  }

  insert(value: number, pos: number) {
    if (!this.list) return alert('초기화 후 사용');
    if (pos == 0) {
      this.insertFirst(value);
      return true;
    }
    for (const [prevNode, idx] of this.list) {
      if (idx == pos - 1) {
        const newNode = new Node(value, prevNode.next);
        prevNode.next = newNode;
        ++this.item;
        return true;
      }
    }
    return false;
  }

  deleteFirst() {
    if (!this.list) return alert('초기화 후 사용');
    if (this.isEmpty()) return alert('비어있음');
    const nextHead = this.list.head.next;
    const value = this.list.head.data;
    delete this.list.head;
    this.list.head = nextHead;
    return value;
  }

  delete(pos: number) {
    if (!this.list) return alert('초기화 후 사용');
    if (this.isEmpty()) return alert('비어있음');
    if (pos == 0) {
      return this.deleteFirst();
    }
    for (const [prevNode, idx] of this.list) {
      if (idx == pos - 1) {
        const nextNode = prevNode.next?.next;
        const value = prevNode.next.data;
        delete prevNode.next;
        prevNode.next = nextNode;
        return value;
      }
    }
  }

  search(value: number) {
    for (const [{ data }, idx] of this.list) {
      if (value == data) return alert(`${value} 값을 찾음. idx: ${idx}`);
    }
    return alert('값을 찾지 못함');
  }

  reverse() {
    let current = this.list.head;
    let reverse, prevReverse;
    while (current) {
      reverse = current;
      current = current.next;
      reverse.next = prevReverse;
      // ex) 43210
      // reverse = current(head만) + prevReverse(이전 역순 리스트)
      // reverse: 4 + undef, current.next: 3210
      // reverse: 3 + 4,     current.next: 210
      // reverse: 2 + 34,    current.next: 10
      // reverse: 1 + 234,   current.next: 0
      // reverse: 0 + 1234,  current.next: undef
      // => 01234
      prevReverse = reverse; // 제작중인 역순 리스트 할당
    }
    this.list.head = reverse;
  }
}
