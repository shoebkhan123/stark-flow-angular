import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private AuthService: AuthService) { }

  intercept(req, next) {

    /* Getting token */
    let token = this.AuthService.getToken();

    /* Intercepting token for incoming and out going http call */
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next.handle(tokenizeReq)
  }

}
