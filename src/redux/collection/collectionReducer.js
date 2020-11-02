import { collectionTypeAction } from './collectionTypes';

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
};

const collectionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case collectionTypeAction.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            };
        case collectionTypeAction.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            };
        case collectionTypeAction.FETCH_COLLECTIONS_FEAILD:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default collectionReducer;