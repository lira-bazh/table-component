import {
  legacy_createStore as createStore,
  applyMiddleware
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers/index.js";

let store = createStore(
  rootReducer(),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
