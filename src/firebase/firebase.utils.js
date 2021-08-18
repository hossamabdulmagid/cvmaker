import firebase from "firebase/firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {

  apiKey: "AIzaSyCUfWw3AVYigq4jHVqlpE2fRTLLBQtL8s8",

  authDomain: "production-1d741-6fa29.firebaseapp.com",

  projectId: "production-1d741-6fa29",

  storageBucket: "production-1d741-6fa29.appspot.com",

  messagingSenderId: "347967416186",

  appId: "1:347967416186:web:98cb3bedc76b1d63c9d8c3"


};

firebase.initializeApp(config);

firebase.database().ref('mynode/mychildnode').remove();

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