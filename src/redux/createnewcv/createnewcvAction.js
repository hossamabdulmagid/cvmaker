import { createnewcvTypeAction } from "./createnewcvType";

import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const GetNameOfCv_Start = () => ({
  type: createnewcvTypeAction.CREATENEWCV_START,
});

const GetNameOfCv_Success = (data) => ({
  type: createnewcvTypeAction.CREATENEWCV_SUCCESS,
  payload: data,
});
const GetNameOfCv_Error = (errorMessage) => ({
  type: createnewcvTypeAction.CREATENEWCV_ERROR,
  payload: errorMessage,
});

export const GetNameOfCv = (currentUser, id) => {
  let hasError = false;
  return (dispatch) => {
    dispatch(GetNameOfCv_Start());
    db.doc(`users/${currentUser.id}/cvs/${id}`)
      .get()
      .then(function (querySnapshot, errorMessage) {
        const newData = querySnapshot.data();
        if (
          querySnapshot.errors &&
          querySnapshot.error &&
          errorMessage &&
          !newData
        ) {
          hasError = true;
          dispatch(GetNameOfCv_Error(errorMessage));
          console.log(errorMessage, `errorMessage`);
        } else {
          if (!hasError) {
            dispatch(GetNameOfCv_Success(newData));
          }
        }
      })
      .catch((errorMessage, newData) => {
        if (errorMessage && !newData) {
          dispatch(GetNameOfCv_Error(errorMessage));
        } else {
          dispatch(GetNameOfCv_Success(newData));
        }
      });
  };
};

const ChangeName_Start = () => ({
  type: createnewcvTypeAction.CHANGENAMECV_START,
});

const ChangeName_Success = (data) => ({
  type: createnewcvTypeAction.CHANGENAMECV_SUCCESS,
  payload: data,
});

const ChangeName_Error = (errorMessage) => ({
  type: createnewcvTypeAction.CHANGENAMECV_ERROR,
  payload: errorMessage,
});

export const DoChangeNameofCv = (currentUser, id, sawsaw, toast) => {
  let hasError = false;
  return (dispatch) => {
    dispatch(ChangeName_Start());
    db.collection(`users/${currentUser.id}/cvs`)
      .doc(`${id}`)
      .update("label", sawsaw)
      .then((errorMessage) => {
        if (errorMessage) {
          hasError = true;
          dispatch(ChangeName_Error(errorMessage));
          console.log(errorMessage, `errorMessage`);
        } else {
          if (!hasError) {
            dispatch(ChangeName_Success());
            toast({
              title: "cv name updated.",
              description: `your cvname updated  to : ${sawsaw} `,
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          }
        }
      })
      .catch((errorMessage, newData) => {
        if (hasError) {
          dispatch(ChangeName_Error(errorMessage));
        } else {
          dispatch(ChangeName_Success());
        }
      });
  };
};
