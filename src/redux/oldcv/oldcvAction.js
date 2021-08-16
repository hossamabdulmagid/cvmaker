/* eslint-disable no-lone-blocks */
import { oldcvActionType } from "./oldcvType";
import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const Oldcv_Start = () => ({
  type: oldcvActionType.GET_OLDCV_START,
});

const Oldcv_Success = (data) => ({
  type: oldcvActionType.GET_OLDCV_SUCCESS,
  payload: data,
});

const Oldcv_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage[key][0], `error from OldcvAction.JS`);
        }
      }
    }
  }
  return {
    type: oldcvActionType.GET_OLDCV_ERROR,
    payload: errorMessage,
  };
};

export const Get_oldCv = (currentUser) => {
  return (dispatch) => {
    let array = [];
    let hasError = false;

    dispatch(Oldcv_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs`)
      .get()
      .then((querySnapshot, errorMessage) => {
        querySnapshot.forEach((doc) => {
          let newData = doc.data();
          newData.id = doc.id;
          array.push(newData);

          if (
            !newData &&
            !newData.id &&
            querySnapshot.error &&
            querySnapshot.errors &&
            errorMessage
          ) {
            hasError = true;
            dispatch(Oldcv_Error(errorMessage));
            console.log(errorMessage, `error from OldcvAction.JS`);
          }
        });
        if (!hasError) {
          dispatch(Oldcv_Success(array));
        }
      })
      .catch((errorMessage, newData) => {
        if (errorMessage && !newData) {
          dispatch(Oldcv_Error(errorMessage));
          console.log(errorMessage, `error from OldcvAction.JS`);
        } else {
          dispatch(Oldcv_Success(array));
        }
      });
  };
};

const Delete_Start = () => ({
  type: oldcvActionType.DELETE_CV_START,
});

const Delete_Success = () => ({
  type: oldcvActionType.DELETE_CV_SUCCESS,
});
const Delete_Error = (errorMessage) => ({
  type: oldcvActionType.DELETE_CV_ERROR,
  payload: errorMessage,
});

export const Delete_Single_CV = (cv, onClose, toast) => {
  console.log(`currentUser : ${cv.userId.id}`);
  console.log(`cvID : ${cv.id}`);
  console.log(`cvName: ${cv.label}`);
  let hasError = false;
  return (dispatch) => {
    dispatch(Delete_Start());
    db.doc(`users/${cv.userId.id}/cvs/${cv.id}`)
      .delete()
      .then((errorMessage, data) => {
        if (errorMessage) {
          hasError = true;
          console.log(errorMessage, `error`);
          dispatch(Delete_Error(errorMessage));
        } else {
          if (!hasError) {
            dispatch(Delete_Success());
            dispatch(Get_oldCv(cv.userId));
            toast({
              title: `Your cv name ${cv.label} Successfully Deleted!`,
              //     description: `your cv deleted you can Create new one.`,
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            });
          }
        }
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
        dispatch(Delete_Error(errorMessage));
      });
  };
};

const Refresh_Start = () => ({
  type: oldcvActionType.REFRESH_LASTMODIFIED_START,
});
const Refresh_Success = () => ({
  type: oldcvActionType.REFRESH_LASTMODIFIED_SUCCESS,
});

const Refresh_Error = (errorlastModified) => ({
  type: oldcvActionType.REFRESH_LASTMODIFIED_ERROR,
  payload: errorlastModified,
});

export const DoRefreshLastModified = (currentUser, id) => {
  const timenow = new Date().toString();
  let hasError = false;
  return (dispatch) => {
    dispatch(Refresh_Start());
    db.collection(`users/${currentUser.id}/cvs`)
      .doc(`${id}`)
      .update("lastModified", timenow)
      .then((errorlastModified) => {
        if (errorlastModified) {
          hasError = true;
          dispatch(Refresh_Error(errorlastModified));
          console.log(errorlastModified, `errorMessage`);
        } else {
          if (!hasError) {
            dispatch(Refresh_Success());
            dispatch(Get_oldCv(currentUser));
          }
        }
      })
      .catch((errorlastModified) => {
        if (hasError) {
          dispatch(Refresh_Error(errorlastModified));
        } else {
          dispatch(Refresh_Success());
        }
      });
  };
};
