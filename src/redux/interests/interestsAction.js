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

const Interest_Error = (errorMessage) => ({
  type: interestsActionType.GET_INTERESTS_SUCCESS,
  payload: errorMessage,
});

export const Get_Interest = (currentUser, id) => {
  return (dispatch) => {
    dispatch(Interest_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Interests`)
      .get()
      .then(function (querySnapshot, errorMessage) {
        const newData = querySnapshot.data();
        {
          !newData && querySnapshot.error && querySnapshot.errors
            ? dispatch(Interest_Error(errorMessage)) &&
              console.log(errorMessage, `error from   InterestsAction.JS`)
            : dispatch(Interest_Success(newData)) &&
              console.log(newData, ` data Coming from InterestsAction.JS`);
        }
      })
      .catch((errorMessage, newData) => {
        {
          errorMessage && !newData
            ? dispatch(Interest_Error(errorMessage)) &&
              console.log(errorMessage, `error from redux files basicinfo`)
            : dispatch(Interest_Success(newData)) &&
              console.log(newData, `data Coming from basicInfoSection`);
        }
      });
  };
};
