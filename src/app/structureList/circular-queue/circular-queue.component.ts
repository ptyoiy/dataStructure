import { Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-circular-queue',
  templateUrl: './circular-queue.component.html',
  styleUrls: ['./circular-queue.component.css'],
})
export class CircularQueueComponent {
  queue: any[];
  size: number;
  front: number;
  rear: number;
  item = 0;
  @ViewChild('queue') view: ElementRef<SVGElement>;
  root;
  pie: d3.Pie<any, number | { valueOf(): number }>;
  data_ready: any[];
  arcGenerator: (r: number) => d3.Arc<any, d3.DefaultArcObject>;

  constructor() {}
  ngAfterViewInit(): void {
    this.root = d3
      .select(this.view.nativeElement)
      .append('g')
      .attr('transform', `translate(${150 / 2}, ${150 / 2})`);
  }

  updateView() {
    this.root
      .selectAll('.arc')
      .data(this.data_ready)
      .join('path')
      .attr('class', 'arc')
      .attr('d', this.arcGenerator(50) as any)
      .attr('stroke', 'black')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);
    this.root
      .selectAll('text.value')
      .data(this.data_ready)
      .join('text')
      .text((d) => this.queue[d.index])
      .attr('class', 'value')
      .attr('transform', (d) => `translate(${this.arcGenerator(50).centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', 17);

    const arrow = [];
    if (this.rear >= 0) arrow.push(this.rear);
    if (this.front >= 0) arrow.push(this.front);

    this.root
      .selectAll('text.arrow')
      .data(arrow)
      .join('text')
      .text((d, i) => i ? 'front' : 'rear')
      .attr('class', 'arrow')
      .attr('transform', (data, i) => `translate(${this.arcGenerator(120).centroid(this.data_ready.find(d => d.index == data))})`)
      .style('text-anchor', 'middle')
      .style('font-size', 17);
  }

  init(size: number) {
    this.size = size;
    this.queue = new Array(size);
    this.front = 0;
    this.rear = 0;
    this.item = 0;

    this.pie = d3.pie().value((d) => d[1]);
    this.data_ready = this.pie(
      Object.entries(
        Array.from({ length: this.size }, () => 100 / this.size)
      ) as any
    );

    this.arcGenerator = (r: number) => d3.arc().innerRadius(0).outerRadius(r); // 원 크기
  }

  isFull() {
    return this.front == (this.rear + 1) % this.size;
  }

  isEmpty() {
    return this.front == this.rear;
  }

  enqueue(data) {
    if (!this.queue) return alert('초기화 후 사용');
    if (this.isFull()) return alert('꽉 참');

    this.rear = (this.rear + 1) % this.size;
    this.queue[this.rear] = data;
    ++this.item;
  }

  peek() {
    if (!this.queue) return alert('초기화 후 사용');
    if (this.isEmpty()) return alert('비어있음');

    return this.queue[this.front];
  }

  dequeue() {
    if (!this.queue) return alert('초기화 후 사용');
    if (this.isEmpty()) return alert('비어있음');

    this.front = (this.front + 1) % this.size;
    const data = this.queue[this.front];
    delete this.queue[this.front]
    return data;
  }
}
