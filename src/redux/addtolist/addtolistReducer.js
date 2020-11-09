import AddtoListActionType from "./addtolistType";
const INITIAL_STATE = {
  loading: false,
  singleroutes: [],
  errors: null,
};
const AddToListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AddtoListActionType.ADD_TO_LIST:
      return {
        ...state,
        singleroutes: [...state.singleroutes, action.payload],
      };
    default:
      return state;
  }
};

export default AddToListReducer;
