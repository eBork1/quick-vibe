import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { CacheService } from 'ionic-cache';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
    public storage: Storage,
    public fireStore: AngularFirestore,
    public afAuth: AngularFireAuth,
    private http: HttpClient,
    // private cache: CacheService
  ) { }

  // handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };

  // cacheRequest(url: string) {
  //   let cacheKey = url;
  //   let request = this.http.get(url).pipe(
  //     retry(2),
  //     catchError(this.handleError)
  //   );

  //   return this.cache.loadFromObservable(cacheKey, request);
  // }

  async logAuthentication(id: string) {
    let vm = this;
    try {
      const adduser = await vm.fireStore.collection('logins').doc(id).set({
        uid: id,
        created: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.log('error add', e);
    }
  }

  async login(uid: string, email: string, username: string): Promise<any> {
    await this.storage.set(this.HAS_LOGGED_IN, true);
    window.dispatchEvent(new CustomEvent('user:login'));
    this.logAuthentication(uid);
    return this.userStore(uid, email, username);
  }

  async logout(): Promise<any> {
    await this.storage.clear();
    await firebase.auth().signOut().then(() => {
      console.log('firebase signout');
    }), ((error) => { console.log(error) });
    true;
    window.dispatchEvent(new CustomEvent('user:logout'));
  }

  async userStore(uid: string, email: string, username: string): Promise<any> {
    await this.storage.set(this.HAS_LOGGED_IN, true);
    this.setEmail(email);
    this.setFirstName(username);
    return this.setUID(uid);
  }

  setUID(uid: string): Promise<any> {
    return this.storage.set('uid', uid);
  }

  setEmail(email: string): Promise<any> {
    return this.storage.set('email', email);
  }

  setFirstName(firstname: string): Promise<any> {
    return this.storage.set('username', firstname);
  }
}
