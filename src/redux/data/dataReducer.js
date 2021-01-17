import { dataActionType } from "./dataType";
import { useToast } from "@chakra-ui/core";

const INITIAL_STATE = {
  data: {},
  isFetching: false,
  errorMessage: undefined,
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataActionType.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case dataActionType.FETCH_COLLECTIONS_SUCCESS:
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
    case dataActionType.FETCH_COLLECTIONS_ERROR:
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
