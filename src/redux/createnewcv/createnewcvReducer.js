import { createnewcvTypeAction } from "./createnewcvType";

const INITAIL_STATE = {
  isFetching: false,
  data: {
    createdAt: "",
    label: "",
    lastModified: "",
  },
  errorMessage: null,
};

const createnewcvReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case createnewcvTypeAction.CREATENEWCV_START:
      return {
        ...state,
        isFetching: true,
      };

    case createnewcvTypeAction.CREATENEWCV_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case createnewcvTypeAction.CREATENEWCV_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };

    case createnewcvTypeAction.GETNAMEOFCV_START:
      return {
        ...state,
        isFetching: true,
      };

    case createnewcvTypeAction.GETNAMEOFCV_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: {
          createdAt: action.payload.createdAt,
          label: action.payload.label,
          lastModified: action.payload.lastModified,
        },
      };

    case createnewcvTypeAction.GETNAMEOFCV_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };

    case createnewcvTypeAction.CHANGENAMECV_START:
      return {
        ...state,
        isFetching: true,
      };

    case createnewcvTypeAction.CHANGENAMECV_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case createnewcvTypeAction.CHANGENAMECV_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default createnewcvReducer;
