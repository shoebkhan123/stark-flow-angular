import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  /* Login Form */
  signinForm: FormGroup;

  /* Use for disable after making request to login */
  isShowSpinner: boolean = false;

  constructor( private titleService: Title,  private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Signin User ')
    this.signinForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  /* Signin function */
  onSignin() {
    this.isShowSpinner = true;
    /* Checking wheather signin form is valid or not */
    if(this.signinForm.invalid) {
      this.isShowSpinner = false;
      return;
    }

    /* signin with auth service */
    this.authService.signin( this.signinForm.value.name, this.signinForm.value.age, this.signinForm.value.email, this.signinForm.value.password)
    .subscribe(res => {
      localStorage.setItem('token', res.token);
      this.isShowSpinner = false;
      console.log(res.token)
      this.router.navigateByUrl('todo/list');
    },
    err => {
      this.isShowSpinner = false;
      console.error(err);
    });

  }

}
