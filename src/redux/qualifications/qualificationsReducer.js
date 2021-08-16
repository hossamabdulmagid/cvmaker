import { qualificationsActionType } from "./qualificationsType";

const INITAIL_STATE = {
  isFetching: false,
  qualifications: {
    concept: "Qualifications",
    content_Qualifications: "",
    type: "qualifications",
  },
  errorMessage: null,
};

const qualificationsReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case qualificationsActionType.GET_QUALIFICATIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case qualificationsActionType.GET_QUALIFICATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        qualifications: {
          concept: action.payload.concept,
          content_Qualifications: action.payload.content_Qualifications,
          type: action.payload.type,
        },
      };
    case qualificationsActionType.GET_QUALIFICATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default qualificationsReducer;
