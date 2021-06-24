import firebase from "firebase/firebase";

import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCmDnA061AM2AvuBmcUg_9QyXz3tikWLUg",
  authDomain: "cvmaker-9134f.firebaseapp.com",
  databaseURL: "https://cvmaker-9134f-default-rtdb.firebaseio.com",
  projectId: "cvmaker-9134f",
  storageBucket: "cvmaker-9134f.appspot.com",
  messagingSenderId: "445950295481",
  appId: "1:445950295481:web:a7775ec76428ed32c74a68",
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

googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const facebookProvider = new firebase.auth.FacebookAuthProvider();

facebookProvider.setCustomParameters({ prompt: "select_account" });

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

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};
