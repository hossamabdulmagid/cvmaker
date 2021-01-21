/* eslint-disable no-lone-blocks */
import { oldcvActionType } from "./oldcvType";
import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const Oldcv_Start = () => ({
  type: oldcvActionType.GET_OLDCV_START,
});

const Oldcv_Success = (data) => ({
  type: oldcvActionType.GET_OLDCV_SUCCESS,
  payload: data,
});

const Oldcv_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage[key][0], `error from OldcvAction.JS`);
        }
      }
    }
  }
  return {
    type: oldcvActionType.GET_OLDCV_ERROR,
    payload: errorMessage,
  };
};

export const Get_oldCv = (currentUser) => {
  return (dispatch) => {
    let array = [];

    dispatch(Oldcv_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs`)
      .get()

      .then(function (querySnapshot, errorMessage) {
        querySnapshot.forEach(function (doc) {
          let newData = doc.data();
          newData.id = doc.id;
          array.push(newData);

          {
            !newData &&
            !newData.id &&
            querySnapshot.error &&
            querySnapshot.errors &&
            errorMessage
              ? dispatch(Oldcv_Error(errorMessage)) &&
                console.log(errorMessage, `error from OldcvAction.JS`)
              : dispatch(Oldcv_Success(array));
          }
        });
      })
      .catch((errorMessage, newData) => {
        {
          errorMessage && !newData
            ? dispatch(Oldcv_Error(errorMessage)) &&
              console.log(errorMessage, `error from OldcvAction.JS`)
            : dispatch(Oldcv_Success(array));
        }
      });
  };
};

const Delete_Start = (data) => ({
  type: oldcvActionType.DELETE_CV_START,
  payload: data,
});

const Delete_Error = (errorMessage) => ({
  type: oldcvActionType.DELETE_CV_ERROR,
  payload: errorMessage,
});

export const Delete_Single_CV = (id, currentUser) => {
  console.log(id, `id here`);
  return (dispatch) => {
    console.log(id, `id after asyncrouns`);

    dispatch(Delete_Start());
    db.doc(`users/${currentUser.id}/cvs/${id}`)
      .delete()
      .then((errorMessage) => {
        {
          errorMessage
            ? dispatch(Delete_Error(errorMessage)) &&
              console.log(errorMessage, `error`)
            : dispatch(Get_oldCv(currentUser));
        }
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
        dispatch(Delete_Error(errorMessage));
      });
  };
};
