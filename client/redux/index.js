import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index.js";

const initialState = {};

let store = createStore(rootReducer(), initialState, applyMiddleware(thunk));

export default store;
