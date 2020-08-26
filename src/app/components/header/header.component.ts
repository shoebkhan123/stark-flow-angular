import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features-module/auth/auth.service';
import { CreateTodoComponent } from 'src/app/features-module/todo/create-todo/create-todo.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private dialog: MatDialog,  public AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /* Logout function */
  onLogout() {
    this.AuthService.logout();
    this.router.navigateByUrl('/')
  }

  /* Open modal for add todo */
  onAdd() {
    this.dialog.open(CreateTodoComponent, {
      disableClose: false
    });
  }

}
