import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from "jwt-decode";
import { LoginService } from '../../shared/services/login.sevice';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    public mainService: MainService
  ) {
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmedNewPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
   }

  resetPassword() {
    if (this.resetForm.valid) {
      let paramsUrl = null;
      this.activatedRoute.params.subscribe((params: Params) => {
        paramsUrl = jwt_decode(params.id);
      })
      let data = {
        password: this.resetForm.get('confirmedNewPassword').value
      }

      let newPassword = this.resetForm.get('newPassword').value;
      let confirmedNewPassword = this.resetForm.get('confirmedNewPassword').value;

      if (newPassword !== confirmedNewPassword) {
        this.mainService.openSnackBar('New password does not match confirmed', null)
      } else {
          this.loginService.onResetPassword(data, paramsUrl.id).subscribe((data) => {
            if (data.success) {
              this.mainService.openSnackBar(data.data, null)
              setTimeout(()=>{
                this.router.navigateByUrl('/auth/login')
              }, 2000)
            } else {
              this.mainService.openSnackBar(data.data, null)
            }
          })
      }
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params.id == null) {
      this.router.navigateByUrl('/auth/login')
      }
    })
  
  }

}
