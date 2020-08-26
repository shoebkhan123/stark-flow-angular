import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', component: TodoComponent,
            children: [
              { path: 'list', component: TodoListComponent },
              { path: 'detail/:todoId', component: TodoDetailComponent }

            ],
         canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
