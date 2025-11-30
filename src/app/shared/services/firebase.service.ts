import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBhwfG2-vbYAt8mCsxlv4Jl_tf5Fb5Gmb0",
    authDomain: "e-commerce-6aeaa.firebaseapp.com",
    projectId: "e-commerce-6aeaa",
    storageBucket: "e-commerce-6aeaa.firebasestorage.app",
    messagingSenderId: "766161199836",
    appId: "1:766161199836:web:6921156e910feb38a08a19",
    measurementId: "G-GK4MVW5WCC"
};

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private _app: FirebaseApp;
    private _auth: Auth;
    private _db: Firestore;

    get app(): FirebaseApp {
        return this._app;
    }

    get auth(): Auth {
        return this._auth;
    }

    get db(): Firestore {
        return this._db;
    }

    
    constructor() {
      
        this._app = initializeApp(firebaseConfig);
        
        this._auth = getAuth(this._app);
        
        this._db = getFirestore(this._app);
        
        console.log("FirebaseService erfolgreich initialisiert.");
    }
}