import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.sevice';
import { ProfileService } from '../../shared/services/profile.service';
import { MainService } from '../../shared/services/main.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AuthHelper } from 'src/app/shared/helpers/auth.helper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AuthGuard]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  profileForm2: FormGroup;
  name:string = '';
  email:string = '';

  constructor(
    private _loginService: LoginService,
    private _profileService: ProfileService,
    public mainService: MainService,
    public router: Router,
    private _authHelper: AuthHelper,

  ) {
      this.profileForm = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        name: new FormControl('', [Validators.required])
      });
      this.profileForm2 = new FormGroup({
        currentPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
        confirmedNewPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      });
   }

   onChangeData() {
     if (this.profileForm.valid) {
       let data = {
         email: this.profileForm.get('email').value,
         name: this.profileForm.get('name').value
       }
       this._profileService.changeUserData(data).subscribe((data)=>{
        if(data.success){
          this.mainService.openSnackBar('Data changed', null);
            localStorage.removeItem('token');
            localStorage.setItem('token', data.data);
            this._authHelper.getToken();
        }
      });
     } 
     if (!this.profileForm.valid) {
       this.mainService.openSnackBar('Form is not correct', null);
     }
   }

   onChangePassword() {
     if (this.profileForm2.valid) {
       let data = {
        currentPassword: this.profileForm2.get('currentPassword').value,
        newPassword: this.profileForm2.get('newPassword').value,
        confirmedNewPassword: this.profileForm2.get('confirmedNewPassword').value
       }
       if(data.newPassword !== data.confirmedNewPassword) {
        this.mainService.openSnackBar('New password does not match confirmed', null);
       } else {
          this._profileService.changePassword(data).subscribe((data)=>{
            if(data.success){
              this.mainService.openSnackBar('Password changed', null);
            } else {
              this.mainService.openSnackBar(data.data, null);
            }
        })

          this.profileForm2.controls['currentPassword'].clearValidators();
          this.profileForm2.controls['newPassword'].clearValidators();
          this.profileForm2.controls['confirmedNewPassword'].clearValidators();
          this.profileForm2.controls['currentPassword'].reset();
          this.profileForm2.controls['newPassword'].reset();
          this.profileForm2.controls['confirmedNewPassword'].reset();
       }
     } else {
        this.mainService.openSnackBar('form is not correct', null);
      }
   }

  ngOnInit() {
    if (!this._authHelper.isAuthenticated()) {
      this.router.navigateByUrl('/home/products');
    }
    this._loginService.getCartLength('cart/length');
    let userData = this._authHelper.getToken();
    this.name = userData.name;
    this.email = userData.email;
  }

}
