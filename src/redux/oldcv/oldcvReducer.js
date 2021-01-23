import { oldcvActionType } from "./oldcvType";

const INITAIL_STATE = {
  isFetching: false,
  oldCv: [],
  errorMessage: null,
};

const oldcvReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case oldcvActionType.GET_OLDCV_START:
      return {
        ...state,
        isFetching: true,
      };

    case oldcvActionType.GET_OLDCV_SUCCESS:
      return {
        ...state,
        isFetching: false,
        oldCv: action.payload,
      };
    case oldcvActionType.GET_OLDCV_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    case oldcvActionType.DELETE_CV_START:
      return {
        ...state,
        isFetching: true,
      };
    case oldcvActionType.DELETE_CV_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };

    case oldcvActionType.DELETE_CV_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};
export default oldcvReducer;
