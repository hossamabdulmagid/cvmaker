import { referencesActionType } from "./referencesType";

const INITAIL_STATE = {
  isFetching: false,
  references: {
    concept: "References",
    content_references: "",
    type: "references",
  },
  errorMessage: null,
};

const referencesReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case referencesActionType.GET_REFERENCES_START:
      return {
        ...state,
        isFetching: true,
      };
    case referencesActionType.GET_REFERENCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        references: {
          concept: action.payload.concept,
          content_references: action.payload.content_references,
          type: action.payload.type,
        },
      };
    case referencesActionType.GET_REFERENCES_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default referencesReducer;
