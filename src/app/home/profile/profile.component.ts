import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.sevice';
import { ProfileService } from '../../shared/services/profile.service';
import { MainService } from '../../shared/services/main.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AuthGuard]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public profileForm2: FormGroup;
  public name:string = '';
  public email:string = '';

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    public mainService: MainService,
    private router: Router
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
       this.profileService.changeUserData(data);
     } else {
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
          this.profileService.changePassword(data)

          this.profileForm2.controls['currentPassword'].clearValidators()
          this.profileForm2.controls['newPassword'].clearValidators()
          this.profileForm2.controls['confirmedNewPassword'].clearValidators()

          this.profileForm2.controls['currentPassword'].reset()
          this.profileForm2.controls['newPassword'].reset()
          this.profileForm2.controls['confirmedNewPassword'].reset()

        // this.profileForm2.updateValueAndValidity({ onlySelf: false });
        // this.profileForm2.controls['currentPassword'].updateValueAndValidity({onlySelf: true})
        // this.profileForm2.controls['currentPassword'].updateValueAndValidity({ onlySelf: false });

       }
     } else {
        this.mainService.openSnackBar('form is not correct', null);
      }
   }

  ngOnInit() {
    if (!this.loginService.isAuthenticated()) {
      this.router.navigateByUrl('/home/products')
    }
    this.loginService.getCartLength('cart/length')
    let userData = this.loginService.getToken()
    this.name = userData.name;
    this.email = userData.email;
  }

}
