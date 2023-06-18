import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  signInUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOutUser() {
    return this.auth.signOut();
  }
}
