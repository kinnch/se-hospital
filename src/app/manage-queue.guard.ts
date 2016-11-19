// manage-queue.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class ManageQueueGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}
  
  canActivate() { 
    let userRoleId = localStorage.getItem('user_roleID');
    if(userRoleId != "3" && userRoleId != "2" && userRoleId != "1"){
        window.history.back();
    }
    return userRoleId == "3" || userRoleId == "2" || userRoleId == "1";
  }
}