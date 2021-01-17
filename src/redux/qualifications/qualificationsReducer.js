import { qualificationsActionType } from "./qualificationsType";

const INITAIL_STATE = {
  isFetching: false,
  qualifications: {},
  errorMessage: null,
};

const qualificationsReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default qualificationsReducer;
