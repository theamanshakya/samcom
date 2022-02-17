import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { UsersService } from '../core/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private authService : AuthService, private userService : UsersService) { }

  userData : any 
  ngOnInit(): void {
    let isLoggedin = this.authService.isLoggedin;    
    // console.log(isLoggedin);
    if (isLoggedin()) {
      this.router.navigate(['home']);
      this.loadData();
    } else {
      this.router.navigate(['login']);
    }

  }

  loadData(){
    this.userService.getData().subscribe((data)=>{
      console.log(data);
      this.userData = data.data;
    })
  }

  goToView(data:any){
    console.log(data);
    localStorage.setItem('userData', JSON.stringify(data,data));
    this.router.navigateByUrl('home/user-details',{state:data});
  }

}
