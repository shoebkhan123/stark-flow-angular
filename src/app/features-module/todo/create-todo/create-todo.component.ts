import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  /* Add to form */
  createTodoForm: FormGroup;

  /* is form getting submit variable */
  isSubmit: boolean = false;

  constructor( private router: Router, @Inject(MAT_DIALOG_DATA) public data: Todo, private dialogRef: MatDialogRef<CreateTodoComponent>, private todoService: TodoService) { }

  ngOnInit(): void {
    this.createTodoForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    })

    /* setting value in form on edit mode */
    if(this.data) {
      this.createTodoForm.patchValue({
        title: this.data.title,
        description: this.data.description,
      })
    }

  }

  /* Adding todo function */
  onAddTodo() {
    this.isSubmit = true;
    /* Checking for validity of form */
    if(this.createTodoForm.invalid) {
      this.isSubmit = false;
      return;
    }

    const title = this.createTodoForm.value.title;
    const description = this.createTodoForm.value.description

    /* Creating todo */
    if(!this.data) {
      this.todoService.createTodo( title, description)
      .subscribe(() => {
        this.router.navigateByUrl('todo/list')
        this.isSubmit = false;
        this.todoService.refreshTodoList.next(true);
        this.dialogRef.close();
      }, err => {
        this.isSubmit = false;
        console.error(err)
      })
    }

    /* Updating todo */
    else {
      this.todoService.updateTodo(this.data._id, title, description)
      .subscribe(() => {
        this.isSubmit = false;
        this.todoService.refreshTodoList.next(true);
        this.dialogRef.close();
      }, err =>{
        this.isSubmit = false;
        console.error(err)
      })
    }


  }


}
