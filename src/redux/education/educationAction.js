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

const EDUCATION_ERROR = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage, `error from educationAction.Js`);
        }
      }
    }
  }
  return {
    type: educationActionType.GET_EDUCATION_ERROR,
    payload: errorMessage,
  };
};

export const GET_Education = (currentUser, id, toast) => {
  return (dispatch) => {
    dispatch(EDUCTION_START());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Education`)
      .get()
      .then((querySnapshot, errorMessage) => {
        const newData = querySnapshot.data();
        {
          !newData &&
          querySnapshot.error &&
          querySnapshot.errors &&
          errorMessage
            ? dispatch(EDUCATION_ERROR(errorMessage)) &&
              console.log(errorMessage, `error from educationAction.Js`)
            : dispatch(EDUCATION_SUCCESS(newData)); //&&
          // console.log(newData, `data from eductionAction.js`);
        }
      })
      .catch((errorMessage, newData) => {
        {
          errorMessage && !newData
            ? dispatch(EDUCATION_ERROR(errorMessage)) &&
              console.log(errorMessage, `error from EduactionAction.JS`)
            : dispatch(EDUCATION_SUCCESS(newData)); //&&
          //     console.log(newData, `data comming from EducationAction.JS`);
        }
      });
  };
};
