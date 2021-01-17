import { interestsActionType } from "./interestsType";

const INITIAL_STATE = {
  isFetching: false,
  interests: {},
  errorMessage: null,
};
const interestsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default interestsReducer;
