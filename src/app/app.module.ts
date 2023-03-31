import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StackLinkedListComponent } from './structureList/stack-linked-list/stack-linked-list.component';
import { LinearQueueComponent } from './structureList/linear-queue/linear-queue.component';
import { CircularQueueComponent } from './structureList/circular-queue/circular-queue.component';
import { DequeComponent } from './structureList/deque/deque.component';

@NgModule({
  declarations: [
    AppComponent,
    StackLinkedListComponent,
    LinearQueueComponent,
    CircularQueueComponent,
    DequeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
