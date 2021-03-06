import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.sevice';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from 'src/app/shared/services/main.service';
import { AuthHelper } from 'src/app/shared/helpers/auth.helper';
import { ResponseLoginModel } from 'src/app/shared/models/login-response-model';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  token: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog,
    public mainService: MainService,
    private _authHelper: AuthHelper
  )
  
  { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
    this.loginService.register$.subscribe((data :any)=> {
      this.loginForm.patchValue({
        email: data.email,
        password: data.password
      })
    })
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogReset, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe();
  }

  onLogin () {
    let loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    if(loginData.password == '' || loginData.email == '') {
      return this.mainService.openSnackBar('All fields must be filled', null)
    }
    
    return this.loginService.onLogin('auth', loginData).subscribe((data:ResponseLoginModel)=>{
        this.token = data.token;
        localStorage.setItem('token', `${this.token}`);
        localStorage.setItem('refreshToken', `${data.refreshToken}`);
        let token = localStorage.getItem('token');
        const decoded = jwt_decode(token) as any;
        this.loginService.getAvatar(`users/avatar/${decoded.id}`);
        this.router.navigateByUrl('/home/products');
    })
  }

  ngOnInit() {
    this.loginService.isLoginPage(true);
    if (this._authHelper.isAuthenticated()) {
      this.router.navigateByUrl('/home/products')
    }
  }
}

@Component({
  selector: 'dialog-reset',
  templateUrl: 'dialog.reset.html',
  styleUrls: ['./login.component.scss']

})
export class DialogReset {
  public resetForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogReset>,
    private loginService: LoginService,
    public mainService: MainService,
    @Inject(MAT_DIALOG_DATA)  public data: DialogData
    ) {
      this.resetForm = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required])
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendEmail() {
    let email = this.resetForm.value.email
    if (this.resetForm.valid) {
        this.dialogRef.close();
        this.loginService.resetPassword(email).subscribe((data)=>{
        if(data.success) {
          this.mainService.openSnackBar(data.data, null)
        } else {
          this.mainService.openSnackBar(data.data, null)
        }
      })
    }

  }


}
