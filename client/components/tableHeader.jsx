import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeSortField } from "../redux/reducers/table";
import "./tableHeader.scss";

const TableHeader = () => {
  const dispatch = useDispatch();
  const sort = useSelector((s) => s.table.sortField);

  function clickSort(event) {
    const type = event.target.dataset.type;
    dispatch(changeSortField(type));
  }

  return (
    <div className="table-line table-header">
      <button
        className="table-cell table__title"
        data-type="title"
        onClick={clickSort}
      >
        Название
      </button>
      <button
        className="table-cell table__year"
        data-type="year"
        onClick={clickSort}
      >
        Год
      </button>
      <button
        className="table-cell table__producer"
        data-type="producer"
        onClick={clickSort}
      >
        Режиссер
      </button>
    </div>
  );
};

TableHeader.propTypes = {};

export default TableHeader;
