import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  public userIsLoggedIn: boolean;

  constructor(
    public router: Router,
    public storage: Storage,
    public afAuth: AngularFireAuth,
    public userService: UserService
  ) {
  }

  ngOnInit() { 
  }
  
  ngAfterViewInit() {
    this.storage.get('hasLoggedIn').then((loggedIn) => {
      this.userIsLoggedIn = loggedIn;
    });
  }

  toLogin() {
    this.router.navigate(['/auth/login']);
  }

  toRegister() {
    this.router.navigate(['/auth/register']);
  }

  logout() {
    this.userService.logout().then(() => {
      window.location.reload();
    })
  }

}
