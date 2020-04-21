import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, filter, take, finalize } from 'rxjs/operators';
import { MainService } from '../services/main.service';
import { LoginService } from '../services/login.sevice';
import { ResponseLoginModel } from '../models/login-response-model';
import { AuthHelper } from '../helpers/auth.helper';

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(
        private router: Router,
        public mainService: MainService,
        private loginService: LoginService,
        private authHelper: AuthHelper
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token')
        request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`||'')
        })
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error == 'Token expired') {
                    this.loginService.onlogOut();
                    return;
                }

                if (error.status === 500) {
                    let caller = error.message
                    this.router.navigate(["serverError", caller])
                }

                if (error instanceof HttpErrorResponse && error.error.statusCode === 401) {
                    return this.handle401Error(request, next);
                }
                if (error instanceof HttpErrorResponse && error.status === 403) {
                    return this.handle403Error(request, next);
                }

                this.mainService.openSnackBar(error.error, null)
                return throwError(error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(null);
    
          return this.refresh().pipe(
            switchMap((data) => {
                console.log(data);
                
              this.refreshTokenSubject.next(data.token);
              this.authHelper.setLoginData(data);
              return next.handle(this.addToken(request, data.token));
            }),
            finalize(() => {
              this.isRefreshing = false;
            }));
        }
        return this.refreshTokenSubject.pipe(
          filter(token => token != null),
          take(1),
          switchMap(jwt => {
            return next.handle(this.addToken(request, jwt));
          }));
      }
    
    
      private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
        return this.refresh().pipe(
          switchMap((data) => {
            this.refreshTokenSubject.next(data.token);
            this.authHelper.setLoginData(data);
            return next.handle(this.addToken(request, data.token));
          }),
          finalize(() => {
            this.isRefreshing = false;
          }));
      }
      

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
            'Authorization': `Bearer ${token}`
            }
        });
    }

    private refresh(): Observable<any> {
        let refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          this.loginService.onlogOut();
          return throwError("");
        }
    
        return this.loginService.refreshToken(refreshToken);
      }
}