import firebase from "firebase/firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAHnION9MrZeDQMyEJOFnadBaZ_vOxz-6U",
  authDomain: "cvmkrprod.firebaseapp.com",
  projectId: "cvmkrprod",
  storageBucket: "cvmkrprod.appspot.com",
  messagingSenderId: "178290871842",
  appId: "1:178290871842:web:5c26f75cd9b3df72db447b",
};
// Your web app's Firebase configuration

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
    const { displayName, email } = userAuth;

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
