import { dataActionType } from "./allsectionsType";

import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const SectionStart = () => ({
  type: dataActionType.GET_SECTIONS_START,
});

const SectionSuccess = (collections) => ({
  type: dataActionType.GET_SECTIONS_SUCCESS,
  payload: collections,
});

const SectionError = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage, `error from dataAction.JS`);
        }
      }
    }
  }
  return {
    type: dataActionType.GET_SECTIONS_ERROR,
    payload: errorMessage,
  };
};

export const Get_allSection = (currentUser, id, toast) => {
  return (dispatch) => {
    dispatch(SectionStart());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then((querySnapshot, errorMessage) => {
        querySnapshot.forEach(function (doc) {
          const data = doc.data();
          const newData = doc.id;
          if (
            !data &&
            !newData &&
            querySnapshot.error &&
            querySnapshot.errors &&
            errorMessage
          ) {
            dispatch(SectionError(errorMessage));
            console.log(errorMessage, `error from dataAction.JS`);
          } else {
            dispatch(SectionSuccess(newData));
          }
        });
      })
      .catch((errorMessage, data, newData) => {
        if (errorMessage && !data && !newData) {
          dispatch(SectionError(errorMessage));
          console.log(errorMessage, `error from dataAction.JS`);
        } else {
          dispatch(SectionSuccess(newData));
        }
      });
  };
};
