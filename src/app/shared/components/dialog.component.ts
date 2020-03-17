import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminService } from '../services/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MainService } from '../services/main.service';

@Component({
    selector: 'dialog-component',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
  })
  
  export class DialogComponent implements OnInit {
    product: any;
    editForm: FormGroup;
    selectedProduct: Subscription;
  
    imageSrc:string | ArrayBuffer;

    constructor (
      public dialogRef: MatDialogRef<DialogComponent>,
      private _adminService: AdminService,
      public mainService: MainService,
    ) 
    {
      this._adminService.editingProduct$.subscribe((data) => {
        this.product = data;
        this.imageSrc = data.bookImage;
      })
      this.editForm = new FormGroup({
        title: new FormControl(this.product.title, [Validators.required]),
        author: new FormControl(this.product.author, [Validators.required]),
        description: new FormControl(this.product.description, [Validators.required]),
        price: new FormControl(this.product.price, [Validators.required]),
        bookImage: new FormControl(this.product.bookImage, [Validators.required])
      })
    }
  
    saveEditedProduct(): any {
        let editedData = {
            _id: this.product._id,
            title: this.editForm.value.title,
            author: this.editForm.value.author,
            description: this.editForm.value.description,
            price: this.editForm.value.price,
            bookImage: this.imageSrc,
        }

        if (JSON.stringify(editedData) === JSON.stringify(this.product)) {
            return;
        }

        try {
            return this._adminService.updateProduct(editedData).subscribe(() => {
                this.dialogRef.close();
                this.mainService.openSnackBar('Product updated', null);
            })
        } catch (error) {
            this.mainService.openSnackBar('Something went wrong', null);
        }
    }

    readURL(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = e => this.imageSrc = reader.result;
            reader.readAsDataURL(file);
        }
      }
  
    ngOnInit() {
  
    }
}