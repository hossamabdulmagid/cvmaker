import { qualificationsActionType } from "./qualificationsType";
import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const Qualifications_Start = () => ({
  type: qualificationsActionType.GET_QUALIFICATIONS_START,
});

const Qualifications_Success = (qualifications) => ({
  type: qualificationsActionType.GET_QUALIFICATIONS_SUCCESS,
  payload: qualifications,
});

const Qualifications_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage, `error from   qualifications.JS`);
        }
      }
    }
  }
  return {
    type: qualificationsActionType.GET_QUALIFICATIONS_ERROR,
    payload: errorMessage,
  };
};

export const Get_Qualifications = (currentUser, id) => {
  let hasError = false;

  return (dispatch) => {
    dispatch(Qualifications_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Qualifications`)
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
          dispatch(Qualifications_Error(errorMessage));
          console.log(errorMessage, `error from   qualifications.JS`);
        } else {
          if (!hasError) {
            dispatch(Qualifications_Success(newData));
          }
        }
      })
      .catch((errorMessage, newData) => {
        if ((errorMessage, !newData)) {
          dispatch(Qualifications_Error(errorMessage));
          console.log(errorMessage, `error from   qualifications.JS`);
        } else {
          dispatch(Qualifications_Success(newData)); // &&
        }
      });
  };
};
