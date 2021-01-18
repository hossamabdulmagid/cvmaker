import { dataActionType } from "./dataType";

const INITIAL_STATE = {
  data: {},
  isFetching: false,
  errorMessage: null,
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataActionType.GET_SECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case dataActionType.GET_SECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: {
          Basicinfo: { ...action.payload.Basicinfo },
          Qualifications: { ...action.payload.Qualifications },
          Interests: { ...action.payload.Interests },
          References: { ...action.payload.References },
          Education: { ...action.payload.Education },
          workexperence: [action.payload.workexperence],
          ...action.payload,
        },
      };
    case dataActionType.GET_SECTIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
