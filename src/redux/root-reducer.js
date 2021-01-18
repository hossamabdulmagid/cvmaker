import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AddToListReducer from "./addtolist/addtolistReducer";
import userReducer from "./user/userReducer";
import allSectionReducer from "./allsections/allsectionsReducer";
import basicinfoReducer from "./basicinfo/basicinfoReducer";
import educationReducer from "./education/educationReducer";
import interestsReducer from "./interests/interestsReducer";
import qualificationsReducer from "./qualifications/qualificationsReducer";
import referencesReducer from "./references/referencesReducer";
import workexperinceReducer from "./workexperince/workexperinceReducer";
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
  allSections: allSectionReducer,
  sectionBasicInfo: basicinfoReducer,
  sectionEducation: educationReducer,
  sectionInterests: interestsReducer,
  sectionQualifications: qualificationsReducer,
  sectionReferences: referencesReducer,
  sectionWorkexperince: workexperinceReducer,
});

export default persistReducer(persistConfig, rootReducer);
