import { dataActionType } from "./dataType";

import { firestore } from "../../firebase/firebase.utils";
import { useToast } from "@chakra-ui/core";
const CollectionStart = () => ({
  type: dataActionType.FETCH_COLLECTIONS_START,
});

const CollectionSuccess = (collections) => ({
  type: dataActionType.FETCH_COLLECTIONS_SUCCESS,
  payload: collections,
});

const CollectionError = (errorMessage) => ({
  type: dataActionType.FETCH_COLLECTIONS_ERROR,
  payload: errorMessage,
});

export const Getdata = (currentUser, id, toast) => {
  return (dispatch) => {
    dispatch(CollectionStart());
    firestore
      .doc(`users/${currentUser.id}`)
      .collection(`cvs/${id}/data`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          const data = doc.data();
          const newData = doc.id;
          dispatch(CollectionSuccess(newData));
        });
      })
      .catch((errorMessage) => {
        dispatch(CollectionError(errorMessage));
        toast({
          title: `there is was an error`,
          description: `${errorMessage} `,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
};
