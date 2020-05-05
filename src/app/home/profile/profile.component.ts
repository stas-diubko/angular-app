import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.sevice';
import { ProfileService } from '../../shared/services/profile.service';
import { MainService } from '../../shared/services/main.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AuthHelper } from 'src/app/shared/helpers/auth.helper';
import { UserProfileView } from 'src/app/shared/models/user-profile-model';
import * as jwt_decode from "jwt-decode";
import { ChangeUserDataModel } from 'src/app/shared/models/change-user-data-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AuthGuard]
})
export class ProfileComponent implements OnInit {

  userData: any;
  profileForm: FormGroup;
  profileForm2: FormGroup;
  name:string = '';
  email:string = '';
  imageSrc:string | ArrayBuffer;

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

   readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
        reader.readAsDataURL(file);
    }
  }

   onChangeData() {
     if (this.profileForm.valid) {
       
        let data = {
          name: this.profileForm.get('name').value,
          email: this.profileForm.get('email').value,
          image: this.imageSrc ? this.imageSrc : this.userData.image
        }
        
       this._profileService.changeUserData(data).subscribe((data: ChangeUserDataModel) => {
         debugger
          this.mainService.openSnackBar(data.message, null);
            // localStorage.removeItem('token');
            // localStorage.setItem('token', data.data);
            // this._authHelper.getToken();
            let token = this._authHelper.getToken();
            this._loginService.getAvatar(`users/avatar/${token.id}`)
            this.getUserData();
      });
     } 
     if (!this.profileForm.valid) {
       this.mainService.openSnackBar('Form is not correct', null);
     }
   }

   onChangePassword() {
     if (this.profileForm2.valid) {
       let data = {
        // userId: 
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

  getUserData() {
    let userData = this._authHelper.getToken();
    this._profileService.getUserData(userData.id).subscribe(data => {
      this.userData = data;
    })
  }

  ngOnInit() {
    if (!this._authHelper.isAuthenticated()) {
      this.router.navigateByUrl('/home/products');
    }
    // this._loginService.getCartLength('cart/length');
    let userData = this._authHelper.getToken();
    this.name = userData.name;
    this.email = userData.email;
    this.getUserData()
  }

}
