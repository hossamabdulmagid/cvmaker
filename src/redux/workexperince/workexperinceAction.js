import { workexperinceActionType } from "./workexperinceType";
import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const Workexperince_Start = () => ({
  type: workexperinceActionType.GET_WORKEXPERINCE_START,
});
const Workexperince_Success = (data) => ({
  type: workexperinceActionType.GET_WORKEXPERINCE_SUCCESS,
  payload: data,
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
  let array = [];
  return (dispatch) => {
    dispatch(Workexperince_Start());
    db.doc(url)
      .get()
      .then((querySnapshot, errorMessage) => {
        const newData = querySnapshot.data();
        array.push(newData);
        //  console.log(array, `Array.Array()`);
        if (!newData) {
          hasError = true;
          dispatch(Workexperince_Error(errorMessage));
          console.log(errorMessage, `error from workexperinceAction.JS`);
        } else if (!hasError && newData) {
          dispatch(Workexperince_Success(newData));
          console.log(newData, `newData Comming From  GETWorkexperAction.JS`);
          console.log(newData, `querySnapshot.dazzzzzzzzzzzzzzta()`);
        }
      })
      .catch((errorMessage) => {
        if (errorMessage) {
          dispatch(Workexperince_Error(errorMessage));
          console.log(errorMessage, `error from workexperinceAction.JS`);
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
const Delete_Cv_Start = () => ({
  type: workexperinceActionType.DELETE_WORKEXP_START,
});

const Delete_Cv_Success = () => ({
  type: workexperinceActionType.DELETE_WORKEXP_SUCCESS,
});
const Delete_CV_Error = (errorMessage) => {
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
    type: workexperinceActionType.DELETE_WORKEXP_ERROR,
    payload: errorMessage,
  };
};

export const Do_Delete_Cv = (currentUser, id, toast) => {
  const url = `users/${currentUser.id}/cvs/${id}/data/Workexperience`;
  return (dispatch) => {
    dispatch(Delete_Cv_Start());
    db.doc(url)
      .delete()
      .then((errorMessage) => {
        if (errorMessage) {
          dispatch(Delete_CV_Error(errorMessage));
          console.log(errorMessage, `error from deleteworkrxpaction.js`);
        } else {
          dispatch(Delete_Cv_Success());
          console.log(`WorkExpDeleted SuccessFull`);
          toast({
            title: "jobs has Been deleted.",
            description: `Document successfully deleted`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      })
      .catch((errorMessage) => {
        if (errorMessage) {
          dispatch(Delete_CV_Error(errorMessage));
          console.log(errorMessage, `error from deleteworkrxpaction.js`);
        }
      });
  };
};
