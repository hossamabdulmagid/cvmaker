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

const Qualifications_Error = (errorMessage) => ({
  type: qualificationsActionType.GET_QUALIFICATIONS_ERROR,
  payload: errorMessage,
});

export const Get_Qualifications = (currentUser, id) => {
  return (dispatch) => {
    dispatch(Qualifications_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Qualifications`)
      .get()
      .then(function (querySnapshot, errorMessage) {
        const newData = querySnapshot.data();
        {
          !newData &&
          querySnapshot.errors &&
          querySnapshot.error &&
          errorMessage
            ? dispatch(Qualifications_Error(errorMessage)) &&
              console.log(errorMessage, `error from   qualifications.JS`)
            : dispatch(Qualifications_Success(newData)) &&
              console.log(newData, `dataComing  from   qualifications.JS`);
        }
      })
      .catch((errorMessage, newData) => {
        {
          errorMessage && !newData
            ? dispatch(Qualifications_Error(errorMessage)) &&
              console.log(errorMessage, `error from   qualifications.JS`)
            : dispatch(Qualifications_Success(newData)) &&
              console.log(newData, `dataComing  from   qualifications.JS`);
        }
      });
  };
};
