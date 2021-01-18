import { dataActionType } from "./dataType";

import { firestore } from "../../firebase/firebase.utils";

const db = firestore;
const SectionStart = () => ({
  type: dataActionType.GET_SECTIONS_START,
});

const SectionSuccess = (collections) => ({
  type: dataActionType.GET_SECTIONS_SUCCESS,
  payload: collections,
});

const SectionError = (errorMessage) => ({
  type: dataActionType.GET_SECTIONS_ERROR,
  payload: errorMessage,
});

export const Getdata = (currentUser, id, toast) => {
  return (dispatch) => {
    dispatch(SectionStart());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then((querySnapshot, errorMessage) => {
        querySnapshot.forEach(function (doc) {
          const data = doc.data();
          const newData = doc.id;
          {
            !data &&
            !newData &&
            querySnapshot.error &&
            querySnapshot.errors &&
            errorMessage
              ? dispatch(SectionError(errorMessage)) &&
                console.log(errorMessage, `error from dataAction.JS`)
              : dispatch(SectionSuccess(newData)) &&
                console.log(newData, `Data Comming From DataAction.JS`);
          }
        });
      })
      .catch((errorMessage, data, newData) => {
        {
          errorMessage && !data && !newData
            ? dispatch(SectionError(errorMessage)) &&
              console.log(errorMessage, `error from dataAction.JS`)
            : dispatch(SectionSuccess(newData)) &&
              console.log(newData, `Data Comming From DataAction.JS`);
        }
      });
  };
};
