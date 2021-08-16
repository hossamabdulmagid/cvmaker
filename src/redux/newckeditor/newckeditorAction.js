import { newCkEdtiorTypeAction } from "./newckeditorType";
import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const CkOldData_Start = () => ({
  type: newCkEdtiorTypeAction.GET_OLD_CKEDIOTR_DATA_START,
});

const CkOldData_Success = (data) => ({
  type: newCkEdtiorTypeAction.GET_OLD_CKEDIOTR_DATA_SUCCESS,
  payload: data,
});

const CkOldData_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage[key][0], `error from referencesAction.JS`);
        }
      }
    }
  }
  return {
    type: newCkEdtiorTypeAction.GET_OLD_CKEDIOTR_DATA_ERROR,
    payload: errorMessage,
  };
};

export const GetOLdDataForCkEditor = (currentUser, id) => {
  return (dispatch) => {
    dispatch(CkOldData_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then((querySnapshot, errorMessage) => {
        querySnapshot.forEach((doc, errorMessage) => {
          const data = doc.data();
          const newData = doc.id;
          if (errorMessage && !data && !newData) {
            dispatch(CkOldData_Error(errorMessage));
          } else if (Object.keys(data).includes("content_new")) {
            dispatch(CkOldData_Success(data));
            console.log(data, `data For New CkeEditor From ConsoleLog`);
            console.log(newData, `new Data Doc.id`);
          }
          return;
        });
      })
      .catch((errorMessage) => {
        if (errorMessage) {
          dispatch(CkOldData_Error(errorMessage));
          console.log(errorMessage, `errorMessage`);
        }
      });
  };
};

const SubmitingCk_Start = () => ({
  type: newCkEdtiorTypeAction.SUBMITING_CKEDITOR_START,
});

const SubmitingCk_Success = (data) => ({
  type: newCkEdtiorTypeAction.SUBMITING_CKEDITOR_SUCCESS,
  payload: data,
});

const SubmitingCk_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage[key][0], `error from referencesAction.JS`);
        }
      }
    }
  }
  return {
    type: newCkEdtiorTypeAction.SUBMITING_CKEDITOR_ERROR,
    payload: errorMessage,
  };
};

export const Do_Submiting_newCkEditor = (
  currentUser,
  id,
  dataToBeSaved,
  toast
) => {
  console.log(`id ${id}`);
  console.log(`currnetUser ${currentUser.id}`);
  console.log(dataToBeSaved, `dataToBeSaved`);
  return (dispatch) => {
    dispatch(SubmitingCk_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`${dataToBeSaved.concept}`)
      .set(dataToBeSaved)
      .then((errorMessage) => {
        if (errorMessage) {
          dispatch(SubmitingCk_Error(errorMessage));
        } else {
          dispatch(SubmitingCk_Success(dataToBeSaved));
          // console.log(dataToBeSaved, `dataToBeSaved`);
          toast({
            title: "Section Updated.",
            description: `Wooow Your new Section  name is : ${dataToBeSaved.concept}`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
        }
      })
      .catch((errorMessage) => {
        if (errorMessage) {
          dispatch(SubmitingCk_Error(errorMessage));
          console.log(errorMessage, `errorMessage`);
        } else if (!errorMessage) {
          dispatch(SubmitingCk_Success(dataToBeSaved));
        }
      });
  };
};
