import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatrialModule } from '../../material/matrial/matrial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';


@NgModule({
  declarations: [TodoComponent, CreateTodoComponent, TodoListComponent, TodoDetailComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatrialModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateTodoComponent
  ],
  entryComponents: [CreateTodoComponent]
})
export class TodoModule { }
