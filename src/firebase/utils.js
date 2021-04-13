import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {firebaseConfig} from './config'

firebase.initializeApp(firebaseConfig)

export const  auth = firebase.auth();
export const firestore = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = ()=> auth.signInWithPopup(googleProvider);

export const handleUserProfile = async (userAuth,additionalData)=>{
    if(!userAuth) return ;
    const {uid} = userAuth;
    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
        const {name,email} = userAuth;
        const timesTamp = new Date();
        try{
            await userRef.set({
                name,
                email,
                createDate : timesTamp,
                ...additionalData
            })

        }
        catch(err){
          console.log(err)
        }
    }
    return userRef;
}