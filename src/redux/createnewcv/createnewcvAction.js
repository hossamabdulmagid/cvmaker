import { createnewcvTypeAction } from "./createnewcvType";

import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const createdCv_Start = () => ({
  type: createnewcvTypeAction.CREATENEWCV_START,
});

const createdCv_Success = () => ({
  type: createnewcvTypeAction.CREATENEWCV_SUCCESS,
});

export const createdCv_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage, `error from createnewCvAction.Js`);
        }
      }
    }
  }
  return {
    type: createnewcvTypeAction.CREATENEWCV_ERROR,
    payload: errorMessage,
  };
};

export const CreateNewCv = (currentUser, history, toast) => {
  const label = "Simple Cv";
  const lastModified = new Date().toString();
  let hasError = false;

  return (dispatch) => {
    dispatch(createdCv_Start());
    db.doc(`users/${currentUser.id}`)
      .collection("cvs")
      .add({
        createdAt: new Date().toString(),
        label,
        lastModified,
      })
      .then((DocRef, errorMessage) => {
        if (errorMessage && !DocRef) {
          hasError = true;
          dispatch(createdCv_Error(errorMessage));
        }

        if (DocRef.id && !hasError) {
          dispatch(createdCv_Success());
          console.log(`the new Cv Has Been Create for ${DocRef.id}`);
          toast({
            title: `Successfuly created new cv `,
            description: `Your cv name is : ${label}`,
            status: "success",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
          const newCvPath = `create-cv/${DocRef.id}`;
          history.push(newCvPath);
        } else {
          console.log(`Some Thing Wrong In Create new Cv`);
        }
      })
      .catch((errorMessage) => {
        if (errorMessage) {
          dispatch(createdCv_Error(errorMessage));
          console.log(errorMessage, `there is  error Message`);
        }
      });
  };
};

const GetNameOfCv_Start = () => ({
  type: createnewcvTypeAction.GETNAMEOFCV_START,
});

const GetNameOfCv_Success = (data) => ({
  type: createnewcvTypeAction.GETNAMEOFCV_SUCCESS,
  payload: data,
});
const GetNameOfCv_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage, `error from createnewCvAction.Js`);
        }
      }
    }
  }
  return {
    type: createnewcvTypeAction.GETNAMEOFCV_ERROR,
    payload: errorMessage,
  };
};
const ChangeName_Start = () => ({
  type: createnewcvTypeAction.CHANGENAMECV_START,
});

const ChangeName_Success = () => ({
  type: createnewcvTypeAction.CHANGENAMECV_SUCCESS,
});

const ChangeName_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage, `error from createnewCvAction.Js`);
        }
      }
    }
  }
  return {
    type: createnewcvTypeAction.CHANGENAMECV_ERROR,
    payload: errorMessage,
  };
};
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

export const DoChangeNameofCv = (currentUser, id, NameCv, toast) => {
  let hasError = false;
  return (dispatch) => {
    dispatch(ChangeName_Start());
    db.collection(`users/${currentUser.id}/cvs`)
      .doc(`${id}`)
      .update("label", NameCv)
      .then((errorMessage) => {
        if (errorMessage) {
          hasError = true;
          dispatch(ChangeName_Error(errorMessage));
          console.log(errorMessage, `errorMessage`);
        } else {
          if (!hasError) {
            dispatch(ChangeName_Success());
            dispatch(GetNameOfCv(currentUser, id));
            toast({
              title: "cv name updated.",
              description: `your cvname updated  to : ${NameCv} `,
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
          dispatch(GetNameOfCv(currentUser, id));
        }
      });
  };
};
