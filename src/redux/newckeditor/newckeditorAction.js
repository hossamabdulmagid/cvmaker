import { newCkEdtiorTypeAction } from "./newckeditorType";
import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const CkOldData_Start = () => ({
  type: newCkEdtiorTypeAction.GET_OLD_CKEDIOTR_DATA_START,
});

const CkOldData_Success = (data) => ({
  type: newCkEdtiorTypeAction.GET_OLD_CKEDIOTR_DATA_SUCCESS,
  payload: data,
});

const CkOldData_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage[key][0], `error from referencesAction.JS`);
        }
      }
    }
  }
  return {
    type: newCkEdtiorTypeAction.GET_OLD_CKEDIOTR_DATA_ERROR,
    payload: errorMessage,
  };
};

export const GetOLdDataForCkEditor = (currentUser, id) => {
  return (dispatch) => {
    dispatch(CkOldData_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then(function (querySnapshot, errorMessage) {
        querySnapshot.forEach(function (doc, errorMessage) {
          const data = doc.data();

          const newData = doc.id;

          if (errorMessage && !data && !newData) {
            dispatch(CkOldData_Error(errorMessage));
          } else if (Object.keys(data).includes("content_new")) {
            dispatch(CkOldData_Success(data));
            console.log(
              data,
              newData,
              `data For New CkeEditor From ConsoleLog`
            );
          }
          return;
        });
      })
      .catch((errorMessage) => {
        if (errorMessage) {
          dispatch(CkOldData_Error(errorMessage));
          console.log(errorMessage, `errorMessage`);
        }
      });
  };
};
