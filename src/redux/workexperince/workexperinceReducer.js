import { workexperinceActionType } from "./workexperinceType";

const INITAIL_STATE = {
  isFetching: false,
  workexperince: [{}],
  errorMessage: null,
};

const workexperinceReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case workexperinceActionType.GET_WORKEXPERINCE_START:
      return {
        ...state,
        isFetching: true,
      };
    case workexperinceActionType.GET_WORKEXPERINCE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        workexperince: action.payload,
      };
    case workexperinceActionType.GET_WORKEXPERINCE_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
};
export default workexperinceReducer;
