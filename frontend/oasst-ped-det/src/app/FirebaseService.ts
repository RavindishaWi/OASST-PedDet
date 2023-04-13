import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { firebaseConfig } from '../../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  db: firebase.firestore.Firestore;

  apiUrl = 'http://localhost:5000/data';

  constructor(private http: HttpClient) {
    // Initialize Firebase App
    firebase.initializeApp(firebaseConfig);

    // Initialize Firestore
    this.db = firebase.firestore();
  }

  getData() {
    return this.http.get(this.apiUrl).toPromise()
      .then(response => JSON.parse(JSON.stringify(response)));
  }
}

