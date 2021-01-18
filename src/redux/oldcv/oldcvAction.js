import { oldcvActionType } from "./oldcvType";
import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const Oldcv_Start = () => ({
  type: oldcvActionType.GET_OLDCV_START,
});

const Oldcv_Success = (oldcv) => ({
  type: oldcvActionType.GET_OLDCV_SUCCESS,
  payload: oldcv,
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
    dispatch(Oldcv_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs`)
      .get()
      .then(function (querySnapshot, errorMessage) {
        querySnapshot.forEach(function (doc) {
          let newData = doc.data();
          newData.id = doc.id;
          {
            !newData &&
            !newData.id &&
            querySnapshot.error &&
            querySnapshot.errors &&
            errorMessage
              ? dispatch(Oldcv_Error(errorMessage)) &&
                console.log(errorMessage, `error from OldcvAction.JS`)
              : dispatch(Oldcv_Success(newData)); // &&
            //   console.log(newData, `data coming from OldCvAction.JS `)
          }
        });
      })
      .catch((errorMessage, newData) => {
        {
          errorMessage && !newData
            ? dispatch(Oldcv_Error(errorMessage)) &&
              console.log(errorMessage, `error from OldcvAction.JS`)
            : dispatch(Oldcv_Success(newData)); // &&
          //console.log(newData, `Data Comming From OldcvAction.JS`);
        }
      });
  };
};
