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
  let hasError = false;
  const url = `users/${currentUser.id}/cvs/${id}/data/Education`;
  return (dispatch) => {
    dispatch(EDUCTION_START());
    db.doc(url)
      .get()
      .then((querySnapshot, errorMessage) => {
        const newData = querySnapshot.data();

        if (!newData) {
          hasError = true;
          dispatch(EDUCATION_ERROR(errorMessage));
          console.log(errorMessage, `error from educationAction.Js`);
        } else {
          dispatch(EDUCATION_SUCCESS(newData));
        }
      })
      .catch((errorMessage, newData) => {
        dispatch(EDUCATION_ERROR(errorMessage));
        console.log(errorMessage, `error from EduactionAction.JS`);
      });
  };
};

const Submiting_Education_Start = () => ({
  type: educationActionType.SUBMITING_EDUCATION_START,
});

const Submiting_Education_Success = (data) => ({
  type: educationActionType.SUBMITING_EDUCATION_SUCCESS,
  payload: data,
});

const Submiting_Education_Error = (errorMessage) => {
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
    type: educationActionType.SUBMITING_EDUCATION_ERROR,
    payload: errorMessage,
  };
};

export const Do_Submiting_Education = (
  currentUser,
  id,
  dataToBeSaved,
  toast
) => {
  let hasError = false;
  const url = `users/${currentUser.id}/cvs/${id}/data/Education`;
  return (dispatch) => {
    db.doc(url)
      .set(dataToBeSaved)
      .then((errorMessage) => {
        if (errorMessage) {
          hasError = true;
          dispatch(Submiting_Education_Error(errorMessage));
          console.log(errorMessage, `errorMessage from EdcationAction.JS`);
        } else if (!hasError && dataToBeSaved) {
          dispatch(Submiting_Education_Success(dataToBeSaved));
          console.log(dataToBeSaved, `dataToBeSaved`);
          toast({
            title: "Section updated.",
            description: `your cvs section education has been updated`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
        } else {
          console.log(errorMessage, `errorMessage from EdcationAction.JS`);
        }
      })
      .catch((errorMessage, dataToBeSaved) => {
        if (errorMessage && !dataToBeSaved) {
          dispatch(Submiting_Education_Error(errorMessage));
          console.log(errorMessage, `errorMessage from EdcationAction.JS`);
        } else if (dataToBeSaved) {
          dispatch(Submiting_Education_Success(dataToBeSaved));
          console.log(dataToBeSaved, `dataToBeSaved`);
        } else {
          console.log(errorMessage, `errorMessage from EdcationAction.JS`);
        }
      });
  };
};
