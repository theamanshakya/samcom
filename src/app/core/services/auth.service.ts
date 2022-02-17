import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedin(){
    const user =  localStorage.getItem('userLogin')
    user == 'true'? 'true' : 'false';
    console.log(user);
    
    return user;
  }
}
