import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  username?: string,
  email?: string,
  password?: string,
  tos?: any,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: User = {
    username: '',
    email: '',
    password: '',
    tos: {
      accepted: true,
      date: firebase.firestore.FieldValue.serverTimestamp()
    },
  };

  constructor(
    public afAuth: AngularFireAuth,
    public fireStore: AngularFirestore,
    public router: Router
  ) { }

  ngOnInit() {}

  async register(form: NgForm) {
    let vm = this;

    if (form.valid) {
      vm.createAuthUser();
    } else {
      console.log("form not valid")
    }
  }

  async createAuthUser() {
    let vm = this;

    // vm.presentLoading();
    try {
      await vm.afAuth.auth.createUserWithEmailAndPassword(
        vm.user.email,
        vm.user.password
      );

      let newuser = vm.afAuth.auth.currentUser;

      if (newuser) {
        newuser.updateProfile({
          displayName: vm.user.username
        }).then(function () {
          vm.addUsertoCollection(
            newuser.uid,
            vm.user.username,
            vm.user.email,
          );
        }, function (error) {
          console.log(error)
        });
      } else {
        console.log("didnt get new user")
      }
    } catch (e) {
      console.log(e);
    }
  }

  async addUsertoCollection(id: string, username: string, email: string) {
    let vm = this;
    try {
      const adduser = await this.fireStore.collection('users').doc(id).set({
        uid: id,
        email: email,
        username: username,
        admin: false,
        docs: {
          tos: this.user.tos,
        }
      });

      // vm.loadingController.dismiss();
      this.router.navigate(['/auth/login']);
    } catch (e) {
      // vm.loadingController.dismiss();
      console.log('error add', e);
    }
  }
  
  checkData(){
    console.log("change ", this.user)
  }

  handleTos() {
    this.user.tos.accepted = !this.user.tos.accepted;
  }

}
