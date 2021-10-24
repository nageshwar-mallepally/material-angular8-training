import { HTTP_INTERCEPTORS, HttpEvent, HttpHeaders } from '@angular/common/http';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authService/authentication.service';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  authReq:any;
    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        // if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('signin') === -1) {

        //   if (req.body instanceof FormData)
        //   {
        //     this.authReq = req.clone({
        //       headers: new HttpHeaders({
        //           // 'Content-Type': 'multipart/form-data',
        //           'Authorization': 'Bearer ' + this.authenticationService.getToken(),
        //       })
        //     });
        //   }else{
        //      this.authReq = req.clone({
        //       headers: new HttpHeaders({
        //           'Content-Type': 'application/json ',
        //           'Authorization': 'Bearer ' + this.authenticationService.getToken(),
        //       })
        //   });
        //  }
        //     return next.handle(this.authReq);
        // } else {
        //     return next.handle(req);
        // }


        let authReq = req;
        const token = this.authenticationService.getToken();
        if (token != null) {
          authReq = req.clone({

            headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }
        return next.handle(authReq);
      }

    }
