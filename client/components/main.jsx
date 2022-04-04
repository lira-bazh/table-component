import React from "react";
import Settings from "./settings";
import TableContent from "./tableContent";
import TableHeader from "./tableHeader";
import Pagination from "./pagination";
import "./main.scss";

const Main = () => {
  return (
    <div className="main-page">
      <div className="table">
        <Settings />
        <div className="table-wrapper">
          <TableHeader />
          <TableContent />
        </div>
        <Pagination />
      </div>
    </div>
  );
};

Main.propTypes = {};

export default Main;
