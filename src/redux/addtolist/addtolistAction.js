import AddtoListActionType from "./addtolistType";

export const AddToList = (data) => ({
  type: AddtoListActionType.ADD_TO_LIST,
  payload: data,
});
