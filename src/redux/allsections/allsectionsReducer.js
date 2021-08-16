import { dataActionType } from "./allsectionsType";

const INITIAL_STATE = {
  isFetching: false,
  section: [],
  errorMessage: null,
  Flag: true,
};

const allSectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataActionType.GET_SECTIONS_START:
      return {
        ...state,
        isFetching: true,
        Flag: true,
      };
    case dataActionType.GET_SECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        section: action.payload,
        Flag: false,
      };
    case dataActionType.GET_SECTIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        Flag: true,
      };
    default:
      return state;
  }
};

export default allSectionReducer;
