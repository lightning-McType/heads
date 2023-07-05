import { combineReducers } from "redux";
import { imageReducer } from "./imageReducer";

const reducers = combineReducers({
  allImages: imageReducer,
});

export default reducers;
