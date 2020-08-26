import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit, OnDestroy {

  /* todo detail */
  todo: Todo;

  /* Spinner while loading data */
  isShowSpinner: boolean = false;

  todoDetailSub$: Subscription;

  constructor( private titleService: Title, private todoService: TodoService, private route: ActivatedRoute) {
    /* Getting todo id from route */
    this.route.paramMap.subscribe(params => {
      if(params.get('todoId')) {
        this.isShowSpinner = true;
        this.getTodo(params.get('todoId'));
      }
    })

  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if(this.todoDetailSub$) {
      this.todoDetailSub$.unsubscribe();
    }
  }

  /* get todo */
  getTodo(todoId: string) {
    this.todoDetailSub$ = this.todoService.getTodo(todoId).subscribe(res => {
      this.isShowSpinner = false;
      this.todo = res;
      this.titleService.setTitle(this.todo.title);
    }, err => {
      this.isShowSpinner = false;
      console.error(err);
    });
  }

}
