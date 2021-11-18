import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';

import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http'; //HttpClient es lo que permite comunicar por HTTP en Angular, lo importo para que sea usable desde toda la app




@NgModule({
  declarations: [
    AppComponent,
    TodoItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
