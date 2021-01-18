import { workexperinceActionType } from "./workexperinceType";
import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const Workexperince_Start = () => ({
  type: workexperinceActionType.GET_WORKEXPERINCE_START,
});
const Workexperince_Success = (workexperince) => ({
  type: workexperinceActionType.GET_WORKEXPERINCE_SUCCESS,
  payload: workexperince,
});
const Workexperince_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(
            errorMessage[key][0],
            `error from workexperinceAction.JS`
          );
        }
      }
    }
  }
  return {
    type: workexperinceActionType.GET_WORKEXPERINCE_ERROR,
    payload: errorMessage,
  };
};

export const Get_Workexperince = (currentUser, id) => {
  return (dispatch) => {
    dispatch(Workexperince_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Workexperience`)
      .get()
      .then(function (querySnapshot, errorMessage) {
        const newData = querySnapshot.data();
        {
          !newData &&
          querySnapshot.errors &&
          querySnapshot.error &&
          errorMessage
            ? dispatch(Workexperince_Error(errorMessage)) &&
              console.log(errorMessage, `error from workexperinceAction.JS`)
            : dispatch(Workexperince_Success(newData)) &&
              console.log(newData, `dataComming from referencesAction.JS`);
        }
      })
      .catch((errorMessage, newData) => {
        {
          errorMessage && !newData
            ? dispatch(Workexperince_Error(errorMessage)) &&
              console.log(errorMessage, `error from workexperinceAction.JS`)
            : dispatch(Workexperince_Success(newData)) &&
              console.log(newData, `dataComming from  workexperinceAction.JS`);
        }
      });
  };
};
