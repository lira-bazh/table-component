import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadData, getDataSize } from "../redux/reducers/table";
import TableLine from "./tableLine";
import "./tableContent.scss";

const TableContent = () => {
  const dispatch = useDispatch();
  const startNum = useSelector((s) => s.table.startNumData);
  const sizePortion = useSelector((s) => s.table.sizePortionToLoad);
  const dataBase = useSelector((s) => s.table.availableData);
  const sortField = useSelector((s) => s.table.sortField);
  const sortType = useSelector((s) => s.table.sortAsc);
  // console.log(dataBase);

  const sortByType = useCallback((obj1, obj2) => {
    if (obj1[sortField] > obj2[sortField]) return sortType;
    if (obj1[sortField] === obj2[sortField]) return 0;
    if (obj1[sortField] < obj2[sortField]) return !sortType;
    return 0;
  },[sortField, sortType])

  dataBase.sort(sortByType);

  useEffect(() => {
    dispatch(uploadData(startNum, sizePortion));
    dispatch(getDataSize());
  }, []);

  return (
    <div className="table-content">
      {dataBase.map((item) => {
        return <TableLine key={item.id} info={item} />;
      })}
    </div>
  );
};

TableContent.propTypes = {};

export default TableContent;
