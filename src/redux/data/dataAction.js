import { dataActionType } from "./dataType";

import { firestore } from "../../firebase/firebase.utils";

import { useParams } from "react-router-dom";

const db = firestore;

const DataStart = () => ({
  type: dataActionType.DATA_START,
});

const DataSucess = (data) => ({
  type: dataActionType.DATA_SUCCESS,
  payload: data,
});
const DataError = (errorMessage) => ({
  type: dataActionType.DATA_ERROR,
  payload: errorMessage,
});

export const GET_DATA = () => {
  return (dispatch) => {
    dispatch(DataStart());
    db.doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const newData = Object.keys(doc.data()).toLocaleString();
          console.log(
            newData,
            `newData before condition@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`
          );
          dispatch(DataSucess(res.data));

          console.log(sidebarRoutes, `sidebarRoutes if condtion`);
          if (newData) {
            array.unshift({ section: newData.toString(), type: "" });
            console.log(array, `array come from firebase`);
            // console.log(sidebarRoutes, `sidebarRoutes before set to new Data with condtion`)
            console.log(sidebarRoutes, `come from initailState => useState`);
            console.log(`beforesetting FLag`);
            setTimeout(() => {
              setFlag(false);
            }, 500);
          }
          //setSidebarRouter(sidebarRoutes => [...array])
          //  sidebarRoutes = [...array]
        });
      })
      .catch((errorMessage) => {
        dispatch(DataError(errorMessage));
        console.log("Something error in Aboutus Fetch");
      });
  };
};
