import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MainService } from '../shared/services/main.service';
import { TableUsersModel } from '../shared/models/table-users-model';
import { AuthHelper } from '../shared/helpers/auth.helper';

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
    public mainService: MainService,
    private _authHelper: AuthHelper,
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  
  displayedColumns: string[] = ['name', 'email', 'id', 'delete'];
  dataUsers: MatTableDataSource<TableUsersModel>;

  page:number = 0;
  pageSize:number = 2;

  getUsers() {
    this._adminService.getAllUsers({ page: this.page, pageSize: this.pageSize }).subscribe((data) => {
      this.dataUsers = new MatTableDataSource<TableUsersModel>(data.data);
      this.usersLength = data.usersLength;
    });
  }

  getPaginatorData(event) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  deleteUser(event) {
    this._adminService.deleteUser(event.currentTarget.id).subscribe((data)=>{
      if (data.success) {
          this.mainService.openSnackBar('User deleted', null);
          this.getUsers();
      }
    })
  }

  ngOnInit() {
    this.getUsers();
  }

}