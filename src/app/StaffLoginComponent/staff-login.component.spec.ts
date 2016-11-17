import {
  inject,
  TestBed
} from "@angular/core/testing";
import {} from "jasmine";
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
// Load the implementations that should be tested
import { StaffLoginComponent } from "./staff-login.component";
import { UserService } from '../../services/user.service';
// import {HTTP_PROVIDERS}   from '@angular/http';
import { Http, Headers } from '@angular/http';
class RouterStub {
  navigateByUrl(url: string) { return url; }
}
class UserServiceStub {
  
  login(username, password) {
  
  }
  
  logout() {
  
  }

  isLoggedIn() {
  
  }
}

describe("Staff-login-component", () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StaffLoginComponent,
      {provide: UserService, useValue: UserServiceStub },
      { provide: Router,      useClass: RouterStub }
    ]}));

  it("username,password should be empty", inject([ StaffLoginComponent ], (app: StaffLoginComponent,userService : UserService) => {
    expect(app.username).toEqual("");
    expect(app.password).toEqual("");
  }));

});