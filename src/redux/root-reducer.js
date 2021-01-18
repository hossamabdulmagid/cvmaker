import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AddToListReducer from "./addtolist/addtolistReducer";
import userReducer from "./user/userReducer";
import dataReducer from "./data/dataReducer";
import basicinfoReducer from "./basicinfo/basicinfoReducer";
import educationReducer from "./education/educationReducer";
import interestsReducer from "./interests/interestsReducer";
//blacklist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
};
//whitelist
const rootReducer = combineReducers({
  add: AddToListReducer,
  user: userReducer,
  allSections: dataReducer,
  sectionBasicInfo: basicinfoReducer,
  sectionEducation: educationReducer,
  sectionInterests: interestsReducer,
});

export default persistReducer(persistConfig, rootReducer);
