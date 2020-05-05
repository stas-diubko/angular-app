import { Component, OnInit, ViewChild, Inject } from '@angular/core';
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
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../shared/components/dialog.component';
import { AddingResponseBookModel } from '../shared/models/adding-response-book-model';
import { DeleteProductModel } from '../shared/models/delete-book-model';
import { GetProductsAdmin } from '../shared/models/get-product-admin-model';
import { GetUsersAdmin } from '../shared/models/get-users-admin-model';
import { DeleteUserModel } from '../shared/models/delete-user-model';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  public users = null;
  allUsers: Subscription;
  public usersLength:number = null;
  addingForm: FormGroup;
  
  constructor(
    public dialog: MatDialog,
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
  displayedColumnsProducts: string[] = ['title', 'author', 'id', 'price', 'edit', 'delete'];
  dataProducts: MatTableDataSource<TableProductModel>;
  productsLength: number = null;
  productPage:number = 0;
  productPageSize:number = 2;
  imageSrc:string | ArrayBuffer;

  getUsers(): void {
    this._adminService.getAllUsers({ page: this.page, pageSize: this.pageSize }).subscribe((data: GetUsersAdmin) => {
      this.dataUsers = new MatTableDataSource<TableUsersModel>(data.data);
      this.usersLength = data.usersLength;
    });
  }

  getProducts(): void {
    this._adminService.getProducts({ page: this.productPage, pageSize: this.productPageSize }).subscribe((data: GetProductsAdmin) => {
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
    this._adminService.deleteUser(event.currentTarget.id).subscribe((data: DeleteUserModel) => {
          this.mainService.openSnackBar(data.message, null);
          this.getUsers();
    })
  }

  deleteProduct(event): void {
    this._adminService.deleteProduct(event.currentTarget.id).subscribe((data: DeleteProductModel)=>{
          this.mainService.openSnackBar(data.message, null);
          this.getProducts();
    })
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
    }
  }

  saveProduct() {
      const book: AddingBookModel = {
        title: this.addingForm.get('title').value,
        author: this.addingForm.get('author').value,
        description: this.addingForm.get('description').value,
        price: this.addingForm.get('price').value,
        bookImage: this.imageSrc
      }

      if (!book.title || !book.author || !book.description || !book.price || !book.bookImage || !book.bookImage) {
        return this.mainService.openSnackBar('All fields must be filled', null);
      }
       
      return this._adminService.addProduct(book).subscribe((data: AddingResponseBookModel) => {
            this.mainService.openSnackBar(data.message, null);
            this.getProducts();
            this.addingForm.controls['title'].clearValidators();
            this.addingForm.controls['author'].clearValidators();
            this.addingForm.controls['description'].clearValidators();
            this.addingForm.controls['price'].clearValidators();
            this.addingForm.controls['title'].reset();
            this.addingForm.controls['author'].reset();
            this.addingForm.controls['description'].reset();
            this.addingForm.controls['price'].reset();
            this.addingForm.controls['bookImage'].reset();
      })
  }

  editProduct(e): void {
    let currentProduct = this.dataProducts.filteredData.find(x => x._id == e.currentTarget.id)
    this._adminService.setSelectedProduct(currentProduct);
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    })
  }

  ngOnInit(): void {
    this.getUsers();
    this.getProducts();
  }

}