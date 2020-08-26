import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  /* Todo list */
  todoList: Todo[] = [];

  /* Showing spinner while getting data from backend */
  isShowSpinner: boolean = false;

  /* Page number */
  pageNumber: number = 0;

  /* Page size */
  pageSize:number = 10;

  /* Total todo variable */
  totalTodo: number = 0;

  todoListSbu$: Subscription;
  refreshListSbu$: Subscription;

  constructor( private titleService: Title, private router: Router, private dialog: MatDialog, private todoService: TodoService ) { }

  ngOnInit(): void {

    this.titleService.setTitle('Your Todo List');

    /* Refreshing the todo list after adding the new todo */
    this.refreshListSbu$ = this.todoService.refreshTodoList.subscribe(res => {
      if(res) {
        this.getTodoList(this.pageSize, this.pageNumber);
      }
    })

    /* calling todo function */
    this.getTodoList(this.pageSize, this.pageNumber);
  }

  ngOnDestroy() {
    if(this.todoListSbu$) {
      this.todoListSbu$.unsubscribe();
    }
    if(this.refreshListSbu$) {
      this.refreshListSbu$.unsubscribe();
    }
  }

  /* Getting todo list from backend */
  getTodoList(pageSize: number, pageNumber: number) {
    this.isShowSpinner = true;
    this.todoListSbu$ = this.todoService.getTodoList(pageSize, pageNumber).subscribe(res => {
      this.isShowSpinner = false;
      this.totalTodo = res.totalTodo;
        this.todoList = res.todo;
    }, err => {
      console.error(err);
      this.isShowSpinner = false;
    })

  }

  /* Edit to list */
  onEdit(todo: Todo) {
    this.dialog.open(CreateTodoComponent, {
      data: todo
    })
  }

  /* Deleting todo */
  onDelete(id: string) {
    this.todoService.deleteTodo(id)
    .subscribe(() => {
      this.getTodoList(this.pageSize, this.pageNumber);
    }, err => {
      console.error(err)
    }
    )
  }

  /* Navigating detail todo on click of todo title */
  navigateToDetail(id: string) {
    this.router.navigateByUrl(`todo/detail/${id}`);
  }

  /* Pagination for todo list */
  pagination(event: PageEvent) {
    this.getTodoList(this.pageSize, event.pageIndex);
  }


}
