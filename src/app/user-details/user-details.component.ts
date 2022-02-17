import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { UsersService } from '../core/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private router:Router, private authService : AuthService, private activatedroute:ActivatedRoute) { }

  userData : any
  ngOnInit(): void {
    let isLoggedin = this.authService.isLoggedin;    
    // console.log(isLoggedin);
    if (!isLoggedin()) {
      this.router.navigate(['login']);
    }
    
    this.userData = JSON.parse(localStorage.getItem('userData')|| 'Default Value')  
    console.log(this.userData);
    
  }



}
