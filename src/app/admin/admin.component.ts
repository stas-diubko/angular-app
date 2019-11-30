import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public users = null
  allUsers: Subscription;
  public usersLength:number = null

  constructor(
    private _adminService: AdminService,
    
  ) {
    this.allUsers = this._adminService.users$.subscribe(data => {
      // this.users = data.data;
      this.dataUsers = new MatTableDataSource<AllUsers>(data.data);
      this.usersLength = data.usersLength
    })
   }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  
  displayedColumns: string[] = ['name', 'email', 'id'];
  dataUsers: MatTableDataSource<AllUsers>;


  getUsers(page, pageSize) {
    this._adminService.getAllUsers({ page: page, pageSize: pageSize })
  }

  page:number = 0;
  pageSize:number = 2;


  getPaginatorData(event) {
    this.getUsers(event.pageIndex, event.pageSize);
  }

  ngOnInit() {
    this.getUsers(this.page, this.pageSize);
  }

}

export interface AllUsers {
  email: string;
  id: number;
  image: string;
  name: string;
  password: string;
}
