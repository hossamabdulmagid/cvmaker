import { basicInfoActionType } from "./basicinfoType";

const INITIAL_STATE = {
  isFetching: false,
  data: {
    basicinfo: {
      title: "",
      fullname: "",
      phone: "",
      email: "",
      address1: "",
      address2: "",
      address3: "",
      webSites: "",
      lastModified: new Date(),
      id: null,
    },
    type: null,
  },
  errorMessage: null,
};

const basicinfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case basicInfoActionType.SUBMITING_BASICINFO_START:
      return {
        ...state,
        isFetching: true,
      };
    case basicInfoActionType.SUBMITING_BASICINFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case basicInfoActionType.SUBMITING_BASICINFO_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    case basicInfoActionType.GET_BASICINFO_START:
      return {
        ...state,
        isFetching: true,
      };
    case basicInfoActionType.GET_BASICINFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: {
          basicinfo: action.payload.basicinfo,
          type: action.payload.type,
        },
      };
    case basicInfoActionType.GET_BASICINFO_ERROR:
      return {
        ...INITIAL_STATE,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default basicinfoReducer;
