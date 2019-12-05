import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    private _urlApi = environment.url;

    public users = new Subject<any>();
    users$ = this.users.asObservable();

    constructor(
        private http: HttpClient,
        public mainService: MainService

    ) { }

    getAllUsers(data) {
        return this.http.put<any>(`${this._urlApi}users`, data)
        .subscribe((data) => {
            this.users.next(data);
        })
    }

    deleteUser(userId) {
        return this.http.delete<any>(`${this._urlApi}users/${userId}`);
    }

  
}