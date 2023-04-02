import { UtilsService } from './../../services/utils.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-linear-queue',
  templateUrl: './linear-queue.component.html',
  styleUrls: ['./linear-queue.component.css']
})
export class LinearQueueComponent implements AfterViewInit {
  queue: any[];
  size: number;
  front: number;
  rear: number;
  item = 0;
  removed: number;
  @ViewChild('queue') view: ElementRef<SVGElement>;
  root: d3.Selection<SVGElement, unknown, null, undefined>;

  constructor(public util: UtilsService){}

  ngAfterViewInit(): void {
    this.root = d3.select(this.view.nativeElement);
  }

  updateView() {
    this.root
      .selectAll('rect')
      .data(this.queue)
      .join('rect')
      .attr('x', (d, i) => i * 20)
      .attr('y', 20)
      .attr('width', 15)
      .attr('height', 2);
    this.root
      .selectAll('text.data')
      .data(this.queue)
      .join('text')
      .attr('class', 'data')
      .attr('x', (d, i) => i * 20)
      .attr('y', 19)
      .text(d => d)
    const arrow = [this.rear, this.front]
    this.root
      .selectAll('text.arrow')
      .data(arrow)
      .join('text')
      .attr('class', 'arrow')
      .attr('x', (d, i) => d * 20)
      .attr('y', 33)
      .attr('font-size', 7)
      .text((d, i) => i ? 'front' : 'rear')
  }

  init(size: number) {
    this.size = size;
    this.queue = new Array(size);
    this.front = this.rear = -1;
    this.item = 0;
    this.removed = undefined;
  }

  isFull() {
    return this.rear == this.size - 1;
  }

  isEmpty() {
    return this.front == this.rear;
  }

  enqueue(data) {
    if (!this.queue) alert("초기화 후 사용")
    if (this.isFull()) alert("꽉 참")
    else {
      this.queue[++this.rear] = data;
      ++this.item
    }
  }

  peek() {
    if (this.isEmpty()) alert("비어있음");
    else {
      return this.queue[this.front];
    }
  }

  dequeue() {
    if (this.isEmpty()) alert("비어있음");
    else {
      const data = this.queue[++this.front];
      this.queue[this.front] = undefined;
      return data;
    }
  }

  sort() {
    let firstValueIdx;
    const values = this.queue.filter((d, i) => {
      if ((d != undefined) && (firstValueIdx == undefined)) firstValueIdx = i;
      if (d == 0) return true;
      return d
    });
    const move = this.queue.splice(firstValueIdx, values.length);
    console.log({firstValueIdx, move, values});
    this.queue.splice(0, 0, ...move);
    this.rear = move.length - 1;
    this.front = -1;
  }
}
