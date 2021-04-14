import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {firebaseConfig} from './config';
import { useEffect, useState } from 'react';

firebase.initializeApp(firebaseConfig)



export const  auth = firebase.auth();
export const firestore = firebase.firestore();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  GoogleProvider.setCustomParameters({prompt:'select_account'});


export const handleUserProfile = async (userAuth,additionalData)=>{
    //userAuth/additionalData object from google
    if(!userAuth) return ;
    const {uid} = userAuth;
    //firebase request
    const userRef = firestore.doc(`users/${uid}`);
    // fetch/read the data from firebase
    const snapshot = await userRef.get();
    if(!snapshot.exists){
        // else doesn't exist  so create a new user
        const {displayName,email,photoURL} = userAuth;
        const timesTamp = new Date();
        const userRoles = ['user'];
        try{

            await userRef.set({
                displayName,
                email,
                photoURL,
                createDate : timesTamp,
                userRoles,
                ...additionalData
            })

        } catch(err){
        console.log(err)
      }
  
    }
    return userRef;
}

