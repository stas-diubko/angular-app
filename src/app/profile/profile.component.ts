import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.sevice';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public profileForm2: FormGroup;
  public name:string = '';
  public email:string = '';

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService
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
       this.profileService.changeUserData(data)
      //  console.log(data);
       
     } else {
       console.log('form is not correct');
       
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
         console.log('new password does not match confirmed');
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
      console.log('form is not correct');
      
    }
   }


  ngOnInit() {
    this.loginService.getCartLength('cart/length')
    let userData = this.loginService.getToken()
    this.name = userData.name;
    this.email = userData.email;
  }

}
