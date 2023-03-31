import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from "d3";

class stackNode implements Iterable<stackNode> {
  item: number;
  link: stackNode;
  constructor(item: number, link: stackNode) {
    this.item = item;
    this.link = link;
  }

  [Symbol.iterator]() {
    return this.stackIterator();
  }

  *stackIterator() {
    let current: stackNode = this;
    yield current;
    while(current.link) {
      current = current.link;
      yield current;
    }
  };
}

type linkedStack = {
  top: stackNode;
}

@Component({
  selector: 'app-stack-linked-list',
  templateUrl: './stack-linked-list.component.html',
  styleUrls: ['./stack-linked-list.component.css']
})
export class StackLinkedListComponent implements AfterViewInit {
  @ViewChild('linkedStack') view: ElementRef<SVGElement>;
  stack: linkedStack = { top: undefined };
  item = 0;

  ngAfterViewInit(): void {
    this.init();
    this.updateView();
  }

  updateView() {
    d3.select(this.view.nativeElement)
      .selectAll('rect')
      .data(this.stack.top || [])
      .join('rect')
      .attr('x', (d, i) => 10)
      .attr('y', (d, i) => i * 15)
      .attr('width', (d, i) => 30)
      .attr('height', (d, i) => 15);

    d3.select(this.view.nativeElement)
      .selectAll('text')
      .data(this.stack.top || [])
      .join('text')
      .attr('x', (d, i) => 45)
      .attr('y', (d, i) => 15 + i * 15)
      .text(d => d.item);
  }

  init() {
    this.stack.top = new stackNode(-1, undefined);
    this.item = 0;
  }

  isEmpty() {
    return !!this.stack.top;
  }

  push(item: number) {
    ++this.item
    const temp = new stackNode(item, this.stack.top);
    this.stack.top = temp;
  }

  pop() {
    if(!this.isEmpty()) {
      return alert("스택이 비어있음");
    } else {
      const item = this.stack.top.item;
      const temp = this.stack.top.link;
      delete this.stack.top;
      this.stack.top = temp;
      return item;
    }
  }
}

