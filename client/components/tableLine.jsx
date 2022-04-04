import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import "./tableLine.scss";

const TableLine = (props) => {
  const findID = useSelector((s) => s.table.findID);

  return (
    <div className={classNames("table-line",  findID.includes(props.info.id) ? "table-line_find" : "")}>
      <div className="table-cell table__title">{props.info.title}</div>
      <div className="table-cell table__year">{props.info.year}</div>
      <div className="table-cell table__producer">{props.info.producer}</div>
    </div>
  );
};

TableLine.propTypes = {};

export default TableLine;
