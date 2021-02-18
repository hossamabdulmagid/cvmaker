import { UserTypeAction } from "./userType";
import { firestore } from "../../firebase/firebase.utils";

const setCurrentUser = (user) => {
  return {
    type: UserTypeAction.SET_CURRENT_USER,
    payload: user,
  };
};

export default setCurrentUser;

export const Data_Start = () => ({
  type: UserTypeAction.GET_DATA_START,
});

export const Data_Success = (data) => ({
  type: UserTypeAction.GET_DATA_SUCCESS,
  payload: data,
});

export const Data_Error = (error) => ({
  type: UserTypeAction.GET_DATA_ERROR,
  payload: error,
});

export const GetInfo = (id, currentUser) => {
  return (dispatch) => {
    dispatch(Data_Start());
    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data(), `here should show data`);
        });
      })
      .get(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .then((res) => {
        dispatch(Data_Success(res.data));
      })
      .catch((error) => {
        dispatch(Data_Error(error));
      });
  };
};
