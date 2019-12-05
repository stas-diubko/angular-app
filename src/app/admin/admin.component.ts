import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MainService } from '../shared/services/main.service';

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
    public mainService: MainService

    
  ) {
    this.allUsers = this._adminService.users$.subscribe(data => {
      // this.users = data.data;
      this.dataUsers = new MatTableDataSource<AllUsers>(data.data);
      this.usersLength = data.usersLength
    })
   }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  
  displayedColumns: string[] = ['name', 'email', 'id', 'delete'];
  dataUsers: MatTableDataSource<AllUsers>;

  page:number = 0;
  pageSize:number = 2;

  getUsers() {
    this._adminService.getAllUsers({ page: this.page, pageSize: this.pageSize })
  }

  getPaginatorData(event) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  deleteUser(event) {
    this._adminService.deleteUser(event.currentTarget.id).subscribe((data)=>{
      if (data.success) {
          this.mainService.openSnackBar('User deleted', null)
          this.getUsers();
      }
    })
  }

  ngOnInit() {
    this.getUsers();
  }

}

export interface AllUsers {
  email: string;
  id: number;
  image: string;
  name: string;
  password: string;
}
