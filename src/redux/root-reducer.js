import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AddToListReducer from './addtolist/addtolistReducer'

import userReducer from './user/userReducer'

//blacklist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
};
//whitelist
const rootReducer = combineReducers({
    add: AddToListReducer,
    user: userReducer

});




export default persistReducer(persistConfig, rootReducer);