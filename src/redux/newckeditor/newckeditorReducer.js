import { newCkEdtiorTypeAction } from "./newckeditorType";

const INITAIL_STATE = {
  isFetching: false,
  newckEditor: {
    concept: "",
    content_new: "",
    type: "entry",
    identiferId: null,
  },
  errorMessage: null,
};

const newckeditorReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case newCkEdtiorTypeAction.SUBMITING_CKEDITOR_START:
      return {
        ...state,
        isFetching: true,
      };
    case newCkEdtiorTypeAction.SUBMITING_CKEDITOR_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case newCkEdtiorTypeAction.SUBMITING_CKEDITOR_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    case newCkEdtiorTypeAction.GET_OLD_CKEDIOTR_DATA_START:
      return {
        ...state,
        isFetching: true,
      };
    case newCkEdtiorTypeAction.GET_OLD_CKEDIOTR_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        newckEditor: {
          concept: action.payload.concept,
          content_new: action.payload.content_new,
          type: state.newckEditor.type,
          identiferId: action.payload.identiferId,
        },
      };
    case newCkEdtiorTypeAction.GET_OLD_CKEDIOTR_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default newckeditorReducer;
