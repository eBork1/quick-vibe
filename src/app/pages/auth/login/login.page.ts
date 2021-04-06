import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

interface User {
  username?: string,
  email?: string,
  password?: string,
  tos?: any,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: User = {
    email: '',
    password: '',
  };

  constructor(
    public afAuth: AngularFireAuth,
    public fireStore: AngularFirestore,
    public router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  async login(form: NgForm) {
    let vm = this;

    if (form.valid) {
      // vm.presentLoading();
      try {
        const user = await vm.afAuth.auth.signInWithEmailAndPassword(
          vm.user.email,
          vm.user.password
        );
        if (user) {
          vm.getUser(user.user.uid)
        } else {
          // vm.loadingController.dismiss();
        }
      } catch (e) {
        console.log('e', e);
        // vm.loadingController.dismiss();
      }
    }
  }

  getUser(id: string) {
    let vm = this;
    console.log("getUser")

    vm.fireStore.collection('users').doc(id).ref.get()
      .then(function (doc) {
        if (doc.exists) {
          let user = doc.data();
          vm.userService.login(id, user.email, user.username).then((value) => {
            // vm.loadingController.dismiss();
            vm.router.navigate(['/app/home']);
          });
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

}
