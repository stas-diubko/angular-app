import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MainService } from '../shared/services/main.service';
import { TableUsersModel } from '../shared/models/table-users-model';
import { AuthHelper } from '../shared/helpers/auth.helper';
import { TableProductModel } from '../shared/models/table-products-admin-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddingBookModel } from '../shared/models/adding-book-model';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  public users = null
  allUsers: Subscription;
  public usersLength:number = null

  addingForm: FormGroup;
  
  constructor(
    private _adminService: AdminService,
    public mainService: MainService,
    private _authHelper: AuthHelper,
  ) {
    this.addingForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      bookImage: new FormControl('', [Validators.required])
    })
   }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  
  displayedColumns: string[] = ['name', 'email', 'id', 'delete'];
  dataUsers: MatTableDataSource<TableUsersModel>;
  page:number = 0;
  pageSize:number = 2;

  displayedColumnsProducts: string[] = ['title', 'author', 'id', 'price', 'delete'];
  dataProducts: MatTableDataSource<TableProductModel>;
  productsLength: number = null;
  productPage:number = 0;
  productPageSize:number = 2;

  getUsers(): void {
    this._adminService.getAllUsers({ page: this.page, pageSize: this.pageSize }).subscribe((data) => {
      this.dataUsers = new MatTableDataSource<TableUsersModel>(data.data);
      this.usersLength = data.usersLength;
    });
  }

  getProducts(): void {
    this._adminService.getProducts({ page: this.productPage, pageSize: this.productPageSize }).subscribe((data) => {
      console.log(data);
      this.dataProducts = new MatTableDataSource<TableProductModel>(data.data);
      this.productsLength = data.booksLength;
    });
  }

  getPaginatorData(event): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  getPaginatorProducts(event): void {
    this.productPage = event.pageIndex;
    this.productPageSize = event.pageSize;
    this.getProducts();
  }

  deleteUser(event): void {
    this._adminService.deleteUser(event.currentTarget.id).subscribe((data)=>{
      if (data.success) {
          this.mainService.openSnackBar('User deleted', null);
          this.getUsers();
      }
    })
  }

  deleteProduct(event): void {
    this._adminService.deleteProduct(event.currentTarget.id).subscribe((data)=>{
      if (data.success) {
          this.mainService.openSnackBar('Product deleted', null);
          this.getProducts();
      }
    })
  }

  ngOnInit(): void {
    this.getUsers();
    this.getProducts();
  }

  saveProduct(): void {
    const book: AddingBookModel = {
      title: this.addingForm.get('title').value,
      author: this.addingForm.get('author').value,
      description: this.addingForm.get('description').value,
      price: this.addingForm.get('price').value,
      // bookImage: 
    }
    console.log(book);
    
  }

}