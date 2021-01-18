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
const Referenes_Error = (errorMessage) => ({
  type: referencesActionType.GET_REFERENCES_ERROR,
  payload: errorMessage,
});

export const Get_References = (currentUser, id) => {
  return (dispatch) => {
    dispatch(Referenes_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`References`)
      .get()
      .then(function (querySnapshot, errorMessage) {
        const newData = querySnapshot.data();
        {
          !newData &&
          querySnapshot.errors &&
          querySnapshot.error &&
          errorMessage
            ? dispatch(Referenes_Error(errorMessage)) &&
              console.log(errorMessage, `error from referencesAction.JS`)
            : dispatch(Referenes_Success(newData)) &&
              console.log(newData, `dataComming from referencesAction.JS`);
        }
      })
      .catch((errorMessage, newData) => {
        {
          errorMessage && !newData
            ? dispatch(Referenes_Error(errorMessage)) &&
              console.log(errorMessage, `error from referencesAction.JS`)
            : dispatch(Referenes_Success(newData)) &&
              console.log(newData, `dataComming from referencesAction.JS`);
        }
      });
  };
};
