import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth-services/authentication.service';
import { User } from '../auth/auth-models/user';
import { Role } from '../auth/auth-models/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  logedInUser: User;

  constructor(private authenticationService: AuthenticationService) {
    // this.logedInUser = this.authenticationService.user;
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe(user => {
      if (user) {
      this.logedInUser = user;
      this.isLoggedIn = true;
      }else{
        this.logedInUser = null;
        this.isLoggedIn = false;
      }
    });
  }

  onSignOut() {
    this.authenticationService.logout();
  }

  onSignIn() {

  }

  get isAdmin(){
    return this.logedInUser && this.logedInUser.role === Role.Admin;
  }

}
