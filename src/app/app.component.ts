import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './features-module/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private router: Router, private authService: AuthService) {}

  ngOnInit() {

    /* Auto login */
    if(this.authService.isLogin) {
      this.router.navigateByUrl('todo/list')
    }

  }

}
