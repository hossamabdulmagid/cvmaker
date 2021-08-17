import firebase from "firebase/firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {

  apiKey: "AIzaSyB-NkQNl4lCxJC2k-eYcTtn0ebho_hXS_w",

  authDomain: "production-1d741.firebaseapp.com",

  projectId: "production-1d741",

  storageBucket: "production-1d741.appspot.com",

  messagingSenderId: "1094231730581",

  appId: "1:1094231730581:web:370b166ddb4ba8a53cee9c"

};

firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const storage = firebase.storage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const facebookProvider = new firebase.auth.FacebookAuthProvider();

facebookProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

export default firebase;

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(snapShot, `SnapShot`);

  if (!snapShot.exists) {
    const {
      displayName,
      email
    } = userAuth;

    const createdAt = new Date();
    console.log(userRef, `userRef`);

    try {
      console.log(`if snapShot Exits show here`);
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};