import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from "jwt-decode";
import { LoginService } from '../shared/services/login.sevice';

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
    private router: Router
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
      this.loginService.onResetPassword(data, paramsUrl.id).subscribe((data) => {
        console.log(data);
        if (data.success) {
          this.router.navigateByUrl('/auth/login')
        } else {
          console.log(data.data)
        }
      })
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
