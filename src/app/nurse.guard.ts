// nurse.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class NurseGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}
  
  canActivate() { 
    let userRoleId = localStorage.getItem('user_roleID');
    if(userRoleId != "3"){
        window.history.back();
    }
    return userRoleId == "3";
  }
}