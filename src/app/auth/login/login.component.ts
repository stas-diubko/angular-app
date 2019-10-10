import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.sevice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  token: string;

  constructor(
    private loginService: LoginService,
    private router: Router
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
        
        this.router.navigateByUrl('/main')
      }
      
    })
  }

  ngOnInit() {

  }

}
