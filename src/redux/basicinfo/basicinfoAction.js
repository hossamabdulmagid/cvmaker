import { basicInfoActionType } from "./basicinfoType";

import { firestore } from "../../firebase/firebase.utils";

const db = firestore;

const BasicInfoStart = () => ({
  type: basicInfoActionType.GET_BASICINFO_START,
});

const BasicInfoSuccess = (data) => ({
  type: basicInfoActionType.GET_BASICINFO_SUCCESS,
  payload: data,
});

const BasicInfoError = (errorMessage) => ({
  type: basicInfoActionType.GET_BASICINFO_ERROR,
  payload: errorMessage,
});

export const GetBasicInfo = (currentUser, id, toast) => {
  let hasError = false;
  return (dispatch) => {
    dispatch(BasicInfoStart());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Basicinfo`)
      .get()
      .then((querySnapshot, errorMessage) => {
        let data = querySnapshot.data();
        if (data) {
          dispatch(BasicInfoSuccess(data));
          console.log(
            data,
            `data.......??????????????????????????????????????`
          );
          console.log(`iam runder`);
        } else {
          dispatch(BasicInfoError(errorMessage));
          console.log(errorMessage, `error from redux files basicinfo`);
        }
      })
      .catch((errorMessage) => {
        if (errorMessage) {
          dispatch(BasicInfoError(errorMessage));
          console.log(errorMessage, `error from redux files basicinfo`);
        }
      });
  };
};

const Submiting_BasicInfo_Start = () => ({
  type: basicInfoActionType.SUBMITING_BASICINFO_START,
});

const Submiting_BasicInfo_Success = (data) => ({
  type: basicInfoActionType.SUBMITING_BASICINFO_SUCCESS,
  payload: data,
});
const Submiting_BasicInfo_Error = (errorMessage) => {
  if (errorMessage && typeof errorMessage === "object") {
    for (let key in errorMessage) {
      if (typeof errorMessage[key] === "object") {
        if (errorMessage[key][0]) {
          console.log(errorMessage, `error from redux files basicinfo`);
        }
      }
    }
  }
  return {
    type: basicInfoActionType.SUBMITING_BASICINFO_ERROR,
  };
};

export const Do_Submiting_BasicInfo = (
  currentUser,
  id,
  dataToBeSaved,
  toast
) => {
  let hasError = false;
  return (dispatch) => {
    dispatch(Submiting_BasicInfo_Start());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .doc(`Basicinfo`)
      .set(dataToBeSaved)
      .then((errorMessage) => {
        if (errorMessage) {
          hasError = true;
          dispatch(Submiting_BasicInfo_Error(errorMessage));
          console.log(errorMessage, `errorMessage from BasicInfoAction.JS`);
        } else if (!hasError) {
          dispatch(Submiting_BasicInfo_Success(dataToBeSaved));
          toast({
            title: "Section updated.",
            description: `your section basicinfo has been updated`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
          console.log(dataToBeSaved, `data From BasicInfoAction.JS`);
        }
      })
      .catch((errorMessage) => {
        if (errorMessage && hasError) {
          dispatch(Submiting_BasicInfo_Error(errorMessage));
          console.log(errorMessage, `errorMessage from BasicInfoAction.JS`);
        } else {
          dispatch(Submiting_BasicInfo_Success(dataToBeSaved));
          console.log(dataToBeSaved, `data From BasicInfoAction.JS`);
        }
      });
  };
};
