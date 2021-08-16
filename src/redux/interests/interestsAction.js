import { interestsActionType } from "./interestsType";
import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const Interest_Start = () => ({
  type: interestsActionType.GET_INTERESTS_START,
});

const Interest_Success = (interests) => ({
  type: interestsActionType.GET_INTERESTS_SUCCESS,
  payload: interests,
});

const Interest_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage, `error from   InterestsAction.JS`);
        }
      }
    }
  }
  return {
    type: interestsActionType.GET_INTERESTS_SUCCESS,
    payload: errorMessage,
  };
};

export const Get_Interest = (currentUser, id) => {
  let hasError = false;
  return (dispatch) => {
    dispatch(Interest_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Interests`)
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
          dispatch(Interest_Error(errorMessage));
          console.log(errorMessage, `error from   InterestsAction.JS`);
        } else {
          if (!hasError) {
            dispatch(Interest_Success(newData));
            //console.log(newData, ` data Coming from InterestsAction.JS`);
          }
        }
      })
      .catch((errorMessage, newData) => {
        if (errorMessage && !newData) {
          dispatch(Interest_Error(errorMessage));
          console.log(errorMessage, `error from   InterestsAction.JS`);
        } else {
          dispatch(Interest_Success(newData));
        }
      });
  };
};
