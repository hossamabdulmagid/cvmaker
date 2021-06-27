import { educationActionType } from "./educationType";

const INITIAL_STATE = {
  isFetchin: false,
  data: {
    education: {
      collagename: "",
      startgraduationyear: "",
      endgraduationyear: "",
      eduactionmajor: "",
      lastModified: "",
      type: "education",
      identiferId: null,
    },
  },
  errorMessage: null,
};
const educationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case educationActionType.SUBMITING_EDUCATION_START:
      return {
        ...state,
        isFetching: true,
      };
    case educationActionType.SUBMITING_EDUCATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case educationActionType.SUBMITING_EDUCATION_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    case educationActionType.GET_EDUCATION_START:
      return {
        ...state,
        isFetching: true,
      };
    case educationActionType.GET_EDUCATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: {
          education: {
            collagename: action.payload.education.collagename,
            startgraduationyear: action.payload.education.startgraduationyear,
            endgraduationyear: action.payload.education.endgraduationyear,
            lastModified: action.payload.education.lastModified,
            eduactionmajor: action.payload.education.eduactionmajor,
            type: action.payload.education.type,
            identiferId: action.payload.education.identiferId,
          },
        },
        errorMessage: null,
      };
    case educationActionType.GET_EDUCATION_ERROR:
      return {
        ...state,
        isFetching: false,
        data: {
          education: {},
        },
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default educationReducer;
