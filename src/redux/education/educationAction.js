import { educationActionType } from "./educationType";
import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const EDUCTION_START = () => ({
  type: educationActionType.GET_EDUCATION_START,
});

const EDUCATION_SUCCESS = (data) => ({
  type: educationActionType.GET_EDUCATION_SUCCESS,
  payload: data,
});

const EDUCATION_ERROR = (errorMessage) => ({
  type: educationActionType.GET_EDUCATION_ERROR,
  payload: errorMessage,
});

export const GET_Education = (currentUser, id, toast) => {
  return (dispatch) => {
    dispatch(EDUCTION_START());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Education`)
      .get()
      .then((querySnapshot) => {
        const newData = querySnapshot.data();
        dispatch(EDUCATION_SUCCESS(newData));
        console.log(newData, `data from redux`);
      })
      .catch((errorMessage) => {
        dispatch(EDUCATION_ERROR(errorMessage));
        console.log(errorMessage, `error from redux files`);
      });
  };
};
