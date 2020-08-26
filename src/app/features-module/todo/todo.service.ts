import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  /* Refresh todo list after creating todo from headers */
  public refreshTodoList = new Subject<boolean>();

  /* Base url for todo */
  BASE_URL: string =  'http://localhost:3000/todo';

  constructor(private http: HttpClient) { }

  /* Get All todo */
  getTodoList(pageSize: number, pageNumber: Number) {
    return this.http.get<any>(`${this.BASE_URL}?limit=${pageSize}&skip=${pageNumber}`);
  }

  /* Get todo by id */
  getTodo(id: string) {
    return this.http.get<Todo>(`${this.BASE_URL}/${id}`);
  }

    /* Create Todo */
  createTodo(title: string, description: string) {
    return this.http.post(this.BASE_URL, {
        title,
        description
    });
  }

  /* Update todo by Id */
  updateTodo(id: string, title: string, description: string) {
    return this.http.patch(`${this.BASE_URL}/${id}`, {
      title,
      description
    });
  }

  /* Delete todo by Id */
  deleteTodo(id: string) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }


}
