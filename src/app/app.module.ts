import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StackLinkedListComponent } from './structureList/stack-linked-list/stack-linked-list.component';
import { LinearQueueComponent } from './structureList/linear-queue/linear-queue.component';
import { CircularQueueComponent } from './structureList/circular-queue/circular-queue.component';
import { DequeComponent } from './structureList/deque/deque.component';
import { LinkedListDequeComponent } from './structureList/linked-list-deque/linked-list-deque.component';
import { LinkedListComponent } from './structureList/linked-list/linked-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StackLinkedListComponent,
    LinearQueueComponent,
    CircularQueueComponent,
    DequeComponent,
    LinkedListDequeComponent,
    LinkedListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
