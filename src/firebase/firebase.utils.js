import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { toast } from "react-toastify";

const config = {
  apiKey: "AIzaSyAUmsbpy_RnDfwsBoX3FjHu7I9ZdNU7DH4",
  authDomain: "cvmaker-458b6.firebaseapp.com",
  databaseURL: "https://cvmaker-458b6.firebaseio.com",
  projectId: "cvmaker-458b6",
  storageBucket: "cvmaker-458b6.appspot.com",
  messagingSenderId: "461496911166",
  appId: "1:461496911166:web:21746be85d64be440b586f"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData, cvs) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(snapShot, `SnapShot`)

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();
    const cvs = {
      createdAt,
      id: snapShot.id + 1,
      basicinfo: {
        FullName: '',
        Email: '',
        Address1: '',
        Address2: '',
        Address3: '',
        WebSites: '',
        Phone: ''
      },
      workexperience: {
        companyName: '',
        endYear: '',
        startYear: ''
      },
      education: {
        collageName: '',
        startGraduationYear: '',
        endGraduationYear: ''
      },
      interests: {
        values: ''
      },
      references: {
        values: ''
      },
      qualifications: {
        values: ''
      },
    };
    console.log(userRef, `userRef`)
    try {
      console.log(`if snapShot Exits show here`);

      await userRef.set({
        displayName,
        email,
        createdAt,
        cvs,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};



export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};



export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const facebookProvider = new firebase.auth.FacebookAuthProvider();

facebookProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider)

export default firebase;