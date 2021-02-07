import { referencesActionType } from "./referencesType";
import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const Referenes_Start = () => ({
  type: referencesActionType.GET_REFERENCES_START,
});

const Referenes_Success = (references) => ({
  type: referencesActionType.GET_REFERENCES_SUCCESS,
  payload: references,
});

const Referenes_Error = (errorMessage) => {
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
    type: referencesActionType.GET_REFERENCES_ERROR,
    payload: errorMessage,
  };
};

export const Get_References = (currentUser, id) => {
  return (dispatch) => {
    let hasError = false;
    dispatch(Referenes_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`References`)
      .get()
      .then((querySnapshot, errorMessage) => {
        const newData = querySnapshot.data();
        if (
          !newData &&
          querySnapshot.errors &&
          querySnapshot.error &&
          errorMessage
        ) {
          hasError = true;
          dispatch(Referenes_Error(errorMessage));
          console.log(errorMessage, `error from referencesAction.JS`);
        } else {
          if (!hasError) {
            dispatch(Referenes_Success(newData));
          }
        }
      })
      .catch((errorMessage, newData) => {
        if (errorMessage && !newData) {
          dispatch(Referenes_Error(errorMessage));
          console.log(errorMessage, `error from referencesAction.JS`);
        } else {
          dispatch(Referenes_Success(newData));
        }
      });
  };
};
