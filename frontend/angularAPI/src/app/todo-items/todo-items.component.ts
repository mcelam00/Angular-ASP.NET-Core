import { Component, OnInit } from '@angular/core';

//Importamos el servicio que hemos creado sin importarnos lo que hace por dentro
import { TodoItemsHttpConnectionService } from '../todo-items-http-connection.service';
import { TodoItem } from '../todoItem';


@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {

  todoItems: TodoItem[] = [];

  nuevoTodoItem: TodoItem= {
    name: "",
    id:0,
    isComplete: false 
    
  };


  constructor(private servicioHTTP: TodoItemsHttpConnectionService) { }

  ngOnInit(): void {
    this.getTodoItems();
  }


  getTodoItems(): void{
    this.servicioHTTP.getTodoItems().subscribe(res => {
      this.todoItems = res;
    });
  
  }
  
  guardarTarea(name: string, id: string): void{
    this.nuevoTodoItem.name = name;
    this.nuevoTodoItem.id = parseInt(id);
    this.saveTodoItemAPI();
    //console.log(this.nuevoTodoItem)

  }

  saveTodoItemAPI(): void{
    this.servicioHTTP.setTodoItem(this.nuevoTodoItem).subscribe()
  }

  actualizarTarea(updatedTodoItem: TodoItem): void{

    //console.log(updatedTodoItem)

    this.servicioHTTP.updateTodoItem(updatedTodoItem).subscribe();

  }

  selectChangeHandler(event: Event): void{
    //Sacamos una confirmacion por si el ususario se equivoca en la convo al picar
    var decision = confirm("¿Está seguro de que desea borrar la tarea con el ID siguiente? " + (event.target as HTMLInputElement).value );

    var idElementoSeleccionadoParaBorrar = (event.target as HTMLInputElement).value

    //como el valor que cogemos en la convo llega aqui como string, vamos a tener que parsearlo a entero para darselo a la funcion de borrar porque id es un entero
    

    if(decision == true){
      //Ha confirmado que si, entonces llamamos al método que borra
      this.servicioHTTP.deleteTodoItem(parseInt(idElementoSeleccionadoParaBorrar)).subscribe()
    }
    //Si no aprueba el borrado, no se hace efectivo y se sale del método

  }


  marcarTrue(todoItem: TodoItem):void{

    todoItem.isComplete = true; //este método cambia el valor de tarea completada de la tarea de la iteracion actual por true si se detecta cambio en el radio y se dispara esta manejadora


  }

  marcarFalse(todoItem: TodoItem):void{

    todoItem.isComplete = false; //CAmbia el valor de completada de la tarea por la que vayamos en la iteracion por false segun si se detecta cambio en el radio

  }


}
