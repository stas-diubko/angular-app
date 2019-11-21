import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private _adminService: AdminService,
  ) { }

  getUsers() {
    let page:number = 0;
    let pageSize:number = 2;
    this._adminService.getAllUsers({ page: page, pageSize: pageSize })
  }

  ngOnInit() {
    this.getUsers();
  }

}
