import { workexperinceActionType } from "./workexperinceType";

const INITAIL_STATE = {
  isFetching: false,
  data: {
    allwork: [],
    type: null,
  },
  type: null,
  errorMessage: null,
};

const workexperinceReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case workexperinceActionType.SUBMIT_WORKEXP_START:
      return {
        ...state,
        isFetching: true,
      };
    case workexperinceActionType.SUBMIT_WORKEXP_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case workexperinceActionType.SUBMIT_WORKEXP_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    case workexperinceActionType.DELETE_WORKEXP_START:
      return {
        ...state,
        isFetching: true,
      };
    case workexperinceActionType.DELETE_WORKEXP_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    case workexperinceActionType.DELETE_WORKEXP_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };

    case workexperinceActionType.GET_WORKEXPERINCE_START:
      return {
        ...state,
        isFetching: true,
      };
    case workexperinceActionType.GET_WORKEXPERINCE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: {
          allwork: action.payload.allwork,
        },
        type: action.payload.type,
      };
    case workexperinceActionType.GET_WORKEXPERINCE_ERROR:
      return {
        ...state,
        isFetching: false,
        data: { allwork: [] },
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
export default workexperinceReducer;
