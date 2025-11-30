import { inject, Injectable, signal } from '@angular/core';
import { FirebaseService } from './firebase.service';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';

import { doc, getDoc } from 'firebase/firestore';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<User | null> (null);

  firebaseService = inject(FirebaseService);


  constructor() {
    onAuthStateChanged(this.firebaseService.auth, async (authUser) => {

  if (!authUser) {
    this.user.set(null);
    return;
  }

  try {
    const user = await this.getUserInfo(authUser.uid);
    this.user.set(user);
  } catch (err) {
    this.user.set(null);
  }
});

  }

  async getAuthState(): Promise<FirebaseUser | null> {
    await this.firebaseService.auth.authStateReady();
    return Promise.resolve(this.firebaseService.auth.currentUser);
  }

  async getUserInfo(uid: string): Promise<User | null>  {
    const userRef = doc(this.firebaseService.db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {

      return null;
    }

    return userDoc.data() as User;
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(
      this.firebaseService.auth,
      email,
      password
    );
  }

  signOut() {
    return signOut(this.firebaseService.auth);
  }
}
