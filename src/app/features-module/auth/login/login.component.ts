import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /* Login Form */
  loginForm: FormGroup;

  /* Use for disable after making request to login */
  isShowSpinner: boolean = false;

  constructor( private titleService: Title, private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login User');
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  /* Login function */
  onLogin() {
    this.isShowSpinner = true;

    /* Checking wheather login form is valid or not */
    if(this.loginForm.invalid) {
      this.isShowSpinner = false;
      return
    }
    /* login with auth service */
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(res => {
      localStorage.setItem('token', res.token);
      this.isShowSpinner = false;
      this.router.navigateByUrl('todo/list');
    },
    err => {
      this.isShowSpinner = false;
      console.error(err);
    });

  }

}
