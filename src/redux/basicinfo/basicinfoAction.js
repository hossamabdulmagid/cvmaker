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

const BasicInfoError = (errorMessage) => ({
  type: basicInfoActionType.GET_BASICINFO_ERROR,
  payload: errorMessage,
});

export const GetBasicInfo = (currentUser, id, toast) => {
  return (dispatch) => {
    dispatch(BasicInfoStart());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Basicinfo`)
      .get()
      .then((querySnapshot) => {
        const newData = querySnapshot.data();
        {
          !newData
            ? dispatch(BasicInfoError(errorMessage))
            : dispatch(BasicInfoSuccess(newData));
        }
      })
      .catch((errorMessage) => {
        dispatch(BasicInfoError(errorMessage));
        console.log(errorMessage, `error from redux files`);
      });
  };
};
