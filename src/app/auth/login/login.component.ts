import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.sevice';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    public dialog: MatDialog
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
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    
    this.loginService.post('login', loginData).subscribe((data:any)=>{
      // console.log(data)
      if (data.success) {
        this.token = data.data;
        localStorage.setItem('token', `${this.token}`);

        let token = localStorage.getItem('token');

        const decoded = jwt_decode(token) as any;

        this.loginService.getAvatar(`users/avatar/${decoded.id}`)
        
        this.router.navigateByUrl('/home')
      }
      
    })
  }

  ngOnInit() {
    if (this.loginService.isAuthenticated()) {
      this.router.navigateByUrl('/home')
    }

    this.activatedRoute.url.subscribe((url: UrlSegment[]) => {
      console.log(url[0].path);
      if(url[0].path !== 'login') {
        this.loginService.isLoginPage(false)
      } else {
        this.loginService.isLoginPage(true)
      }
    })

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
    this.loginService.resetPassword(email)
    // console.log(email);
    
  }


}
