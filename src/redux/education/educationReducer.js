import { educationActionType } from "./basicinfoType";

const INITIAL_STATE = {
  isFetchin: false,
  education: {},
  errorMessage: null,
};

const educationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default educationReducer;
