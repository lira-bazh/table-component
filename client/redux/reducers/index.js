import { combineReducers } from "redux";
import table from "./table.js";

const createRootReducer = () =>
  combineReducers({
    table,
  });

export default createRootReducer;
