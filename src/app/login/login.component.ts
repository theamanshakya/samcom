import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private authService : AuthService){

  }

  ngOnInit(): void {
    let isLoggedin = this.authService.isLoggedin;    
    // console.log(isLoggedin);
    if (isLoggedin()) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
      
    
  }

  users = [
    {
      email:"samcom@gmail.com",
      password:"123"
    },
    {
      email:"samcomtechnobrains@gmail.com",
      password:"sam123@"
    }
  ]
 

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  },)
  get loginData(){
    return this.loginForm.controls;
  }
  login(){
    if (this.loginForm.valid) {
      // console.log('Login Success');
      console.log(this.loginForm.value);
      let validUser : boolean = false
      this.users.forEach(user => {
        if(this.loginForm.value.email==user.email && this.loginForm.value.password == user.password ){
          validUser = true;
        }
      })
      if (validUser) {
        localStorage.setItem('userLogin','true');
        alert("Login Success");
        this.router.navigate(['home']);
      } else {
        sessionStorage.setItem('userLogin','false');
        alert("Login Failed");
        this.loginForm.reset();
      }

    }  else {
      this.validateAllFields(this.loginForm);
    }
  }

   validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
}
