import { dataActionType } from "./allsectionsType";

import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const SectionStart = () => ({
  type: dataActionType.GET_SECTIONS_START,
});

const SectionSuccess = (section) => ({
  type: dataActionType.GET_SECTIONS_SUCCESS,
  payload: section,
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
  let array = [];
  let hasError = false;
  return (dispatch) => {
    dispatch(SectionStart());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then((querySnapshot, errorMessage) => {
        querySnapshot.forEach(function (doc) {
          let data = doc.data();
          let sectionName = doc.id;
          if (data) {
            array.push({
              section: sectionName.toString(),
              type: data.type,
            });
          }
          if (
            !data &&
            !sectionName &&
            querySnapshot.error &&
            querySnapshot.errors &&
            errorMessage
          ) {
            hasError = true;
            dispatch(SectionError(errorMessage));
            console.log(errorMessage, `error from dataAction.JS`);
          } else {
            if (!hasError) {
              dispatch(SectionSuccess(array));
            }
          }
        });
      })
      .catch((errorMessage, data, sectionName) => {
        if (errorMessage && !data && !sectionName) {
          dispatch(SectionError(errorMessage));
          console.log(errorMessage, `error from dataAction.JS`);
        } else {
          dispatch(SectionSuccess(array));
          console.log(array, `@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
        }
      });
  };
};
