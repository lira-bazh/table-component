import { combineReducers } from "@reduxjs/toolkit";
import table from "./table.js";

const createRootReducer = () =>
  combineReducers({
    table
  });

export default createRootReducer;
