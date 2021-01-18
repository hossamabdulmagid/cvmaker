import { oldcvActionType } from "./oldcvType";

const INITAIL_STATE = {
  isFetching: false,
  oldcv: [{}],
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
        oldcv: [action.payload],
      };
    case oldcvActionType.GET_OLDCV_ERROR:
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
