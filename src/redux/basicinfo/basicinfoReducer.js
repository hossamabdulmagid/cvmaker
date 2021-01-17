import { basicInfoActionType } from "./basicinfoType";

const INITIAL_STATE = {
  isFetching: false,
  data: {
    basicinfo: {
      fullname: "",
      webSites: "",
      email: "",
      address1: "",
      address2: "",
      address3: "",
      title: "",
      phone: "",
      lastModified: "",
    },
  },
  errorMessage: null,
};

const basicinfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
          basicinfo: {
            fullname: action.payload.basicinfo.fullname,
            webSites: action.payload.basicinfo.webSites,
            email: action.payload.basicinfo.email,
            address1: action.payload.basicinfo.address1,
            address2: action.payload.basicinfo.address2,
            address3: action.payload.basicinfo.address3,
            phone: action.payload.basicinfo.phone,
            title: action.payload.basicinfo.title,
            lastModified: action.payload.basicinfo.lastModified,
          },
        },
      };
    case basicInfoActionType.GET_BASICINFO_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default basicinfoReducer;
