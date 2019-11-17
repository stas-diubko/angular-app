import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MainService } from '../services/main.service';

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {
    constructor(
        private router: Router,
        public mainService: MainService

    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token')
        request = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`||'')
        })
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),

            catchError((error: HttpErrorResponse) => {
                if (error.status === 500) {
                    let caller = error.message
                    this.router.navigate(["serverError", caller])
                }
                this.mainService.openSnackBar(error.error, null)
                return throwError(error);
            })
        );
    }
}