import { workexpernceActionType } from "./workexpernceType";

const INITAIL_STATE = {
  isFetching: false,
  workexpernce: [],
  errorMessage: null,
};

const workexpernceReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default workexpernceReducer;
