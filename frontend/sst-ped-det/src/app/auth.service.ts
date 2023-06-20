import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isSignedIn: boolean = false;

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      this._isSignedIn = !!user;
    });
  }

  get isUserSignedIn(): boolean {
    return this._isSignedIn;
  }

  signInUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOutUser() {
    return this.auth.signOut();
  }
}
