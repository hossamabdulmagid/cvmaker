import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AddToListReducer from "./addtolist/addtolistReducer";
import userReducer from "./user/userReducer";
import oldcvReducer from "./oldcv/oldcvReducer";
import allSectionReducer from "./allsections/allsectionsReducer";
import basicinfoReducer from "./basicinfo/basicinfoReducer";
import educationReducer from "./education/educationReducer";
import interestsReducer from "./interests/interestsReducer";
import qualificationsReducer from "./qualifications/qualificationsReducer";
import referencesReducer from "./references/referencesReducer";
import workexperinceReducer from "./workexperince/workexperinceReducer";
import createnewcvReducer from "./createnewcv/createnewcvReducer";
import newckeditorReducer from "./newckeditor/newckeditorReducer";
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
  allOldCv: oldcvReducer,
  createnewcv: createnewcvReducer,
  allSections: allSectionReducer,
  sectionBasicInfo: basicinfoReducer,
  sectionEducation: educationReducer,
  sectionInterests: interestsReducer,
  sectionQualifications: qualificationsReducer,
  sectionReferences: referencesReducer,
  sectionWorkexperince: workexperinceReducer,
  newSectionCkEditor: newckeditorReducer,
});

export default persistReducer(persistConfig, rootReducer);
