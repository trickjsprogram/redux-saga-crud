import { combineReducers } from "redux";
import usersReducers from "./reducer";

const rootReducer = combineReducers({
  data: usersReducers,
});

export default rootReducer;
