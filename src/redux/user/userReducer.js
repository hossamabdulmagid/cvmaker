import { UserTypeAction } from "./userType";
const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  profile: {},
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypeAction.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case UserTypeAction.GET_DATA_START:
      return {
        ...state,
        currentUser: action.payload,
        loading: true,
      };
    case UserTypeAction.GET_DATA_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        profile: action.payload,
        loading: false,
      };

    case UserTypeAction.GET_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
