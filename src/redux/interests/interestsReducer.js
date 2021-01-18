import { interestsActionType } from "./interestsType";

const INITIAL_STATE = {
  isFetching: false,
  interests: {
    concept: "Interests",
    content_intersets: "",
    type: "",
  },
  errorMessage: null,
};

const interestsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case interestsActionType.GET_INTERESTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case interestsActionType.GET_INTERESTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        interests: {
          concept: action.payload.concept,
          content_intersets: action.payload.content_intersets,
          type: action.payload.type,
        },
      };
    case interestsActionType.GET_INTERESTS_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default interestsReducer;
