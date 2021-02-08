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
  let hasError = false;
  let url = `users/${currentUser.id}/cvs/${id}/data/Workexperience`;
  return (dispatch) => {
    dispatch(Workexperince_Start());
    db.doc(url)
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
          dispatch(Workexperince_Error(errorMessage));
          console.log(errorMessage, `error from workexperinceAction.JS`);
        } else if (!hasError) {
          dispatch(Workexperince_Success(newData));
        }
      })
      .catch((errorMessage, newData) => {
        if (errorMessage && !newData) {
          dispatch(Workexperince_Error(errorMessage));
          console.log(errorMessage, `error from workexperinceAction.JS`);
        } else {
          dispatch(Workexperince_Success(newData));
        }
      });
  };
};

const Submiting_WorkExp_Start = () => ({
  type: workexperinceActionType.SUBMIT_WORKEXP_START,
});

const Submiting_WorkExp_Success = (data) => ({
  type: workexperinceActionType.SUBMIT_WORKEXP_SUCCESS,
  payload: data,
});

const Submiting_WorkExp_Error = (errorMessage) => {
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
    type: workexperinceActionType.SUBMIT_WORKEXP_ERROR,
    payload: errorMessage,
  };
};

export const Do_Submiting_WorkExp = (currentUser, id, dataToBeSaved, toast) => {
  let hasError = false;
  const url = `users/${currentUser.id}/cvs/${id}/data/Workexperience`;
  return (dispatch) => {
    dispatch(Submiting_WorkExp_Start());
    db.doc(url)
      .set(dataToBeSaved)
      .then((errorMessage) => {
        if (errorMessage) {
          hasError = true;
          dispatch(Submiting_WorkExp_Error(errorMessage));
          console.log(errorMessage, `error from workexperinceAction.JS`);
        } else if (!hasError && dataToBeSaved) {
          dispatch(Submiting_WorkExp_Success(dataToBeSaved));
          toast({
            title: "Section updated.",
            description: `your cvs section workexperince has been updated`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
          console.log(dataToBeSaved, `data Comming From WorkexperAction.JS`);
        }
      })
      .catch((errorMessage, hasError, dataToBeSaved) => {
        if (errorMessage && hasError) {
          dispatch(Submiting_WorkExp_Error(errorMessage));
          console.log(errorMessage, `error from workexperinceAction.JS`);
        } else if (!hasError && dataToBeSaved) {
          dispatch(Submiting_WorkExp_Success(dataToBeSaved));
          console.log(dataToBeSaved, `data Comming From WorkexperAction.JS`);
        } else {
          console.log(errorMessage, `error from workexperinceAction.JS`);
        }
      });
  };
};
