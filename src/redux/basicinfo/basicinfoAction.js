import { basicInfoActionType } from "./basicinfoType";

import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const BasicInfoStart = () => ({
  type: basicInfoActionType.GET_BASICINFO_START,
});

const BasicInfoSuccess = (basicinfo) => ({
  type: basicInfoActionType.GET_BASICINFO_SUCCESS,
  payload: basicinfo,
});

const BasicInfoError = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage, `error from redux files basicinfo`);
        }
      }
    }
  }
  return {
    type: basicInfoActionType.GET_BASICINFO_ERROR,
    payload: errorMessage,
  };
};

export const GetBasicInfo = (currentUser, id, toast) => {
  let hasError = false;
  return (dispatch) => {
    dispatch(BasicInfoStart());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Basicinfo`)
      .get()
      .then((querySnapshot, errorMessage) => {
        const newData = querySnapshot.data();
        if (
          !newData &&
          querySnapshot.error &&
          querySnapshot.errors &&
          errorMessage
        ) {
          hasError = true;
          dispatch(BasicInfoError(errorMessage));
          console.log(errorMessage, `error from redux files basicinfo`);
        } else {
          if (!hasError) {
            dispatch(BasicInfoSuccess(newData));
          }
        }
      })
      .catch((errorMessage, newData) => {
        if (errorMessage && !newData) {
          dispatch(BasicInfoError(errorMessage));
          console.log(errorMessage, `error from redux files basicinfo`);
        } else {
          dispatch(BasicInfoSuccess(newData));
        }
      });
  };
};
