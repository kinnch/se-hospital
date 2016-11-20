// prescription-history.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class PrescriptionHistoryGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}
  
  canActivate() { 
    let userRoleId = localStorage.getItem('user_roleID');
    if(userRoleId != "4" && userRoleId != "2"){
        window.history.back();
    }
    return userRoleId == "4" || userRoleId == "2";
  }
}