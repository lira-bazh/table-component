import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Main from "../components/main";
import store from "../redux/index.js";
import "./root.scss";

const Root = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<Main />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default Root;
