import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TodoItem } from './todoItem';
import { catchError, map, tap } from 'rxjs/operators'; //catchError permite empipar los errores


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json', //aunque funciona también sin la cabecera por la politica cors del server que premite cualquier header, no va de mas el ponerla para tener una mejor información
    //Authorization: 'my-auth-token'
  })
};



@Injectable({
  providedIn: 'root'
})

export class TodoItemsHttpConnectionService {

  private BaseURL = "https://localhost:5001/api/todoitems"; //5001 es el puerto ssl; el 5000 es sin ssl 
  //private BaseURL = "http://localhost:5000/api/todoitems";

  constructor(private http: HttpClient) { }


  getTodoItems(): Observable<TodoItem[]>{
 
    return this.http.get<TodoItem[]>(this.BaseURL)
      .pipe(
        catchError(this.handleError<TodoItem[]>())
      );
  }

  setTodoItem(todoItem: TodoItem): Observable<TodoItem>{

    return this.http.post<TodoItem>(this.BaseURL, todoItem)
    .pipe(
      catchError(this.handleError<TodoItem>())
    );

  }

  updateTodoItem(updatedTodoItem: TodoItem): Observable<TodoItem>{
    //Es necesario modificar la URL para que lleve detrás el ID del objeto que hemos actualizado y el backend lo identifique por el id y sobreescriba su nueva informacion

    var URL: string = `${this.BaseURL}/${updatedTodoItem.id}` //CUIDADO CON LA COMILLA QUE ES ` EN VEZ DE ' O "

    return this.http.put<TodoItem>(URL, updatedTodoItem, httpOptions)
    .pipe(
      catchError(this.handleError<TodoItem>())
    );

  }


  deleteTodoItem(idItemToDelete: number): Observable<TodoItem>{

    var URL: string = `${this.BaseURL}/${idItemToDelete}`

    return this.http.delete<TodoItem>(URL)
      .pipe(
        catchError(this.handleError<TodoItem>())
      )


  }









  private handleError<T>(operation = 'operation', result?: T) {//toma un tipo generico para que la podamos llamar desde los distintos catchError de las distintas peticiones que hagamos

    return (error: any): Observable<T> => {

      //send the error to console log
      console.error(error); 
    
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
