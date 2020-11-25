import { dataActionType } from "./dataType";
const INITIAL_STATE = {
  fetching: false,
  data: {},
  errorMessage: null,
};
const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataActionType.DATA_START:
      return {
        ...state,
        fetching: true,
      };
    case dataActionType.DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.payload,
      };
    case dataActionType.DATA_ERROR:
      return {
        ...state,
        fetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
export default dataReducer;
