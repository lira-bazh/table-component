import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadData } from "../redux/reducers/table";
import "./paginationButton.scss";

const PaginationButton = ({ info }) => {
  const dispatch = useDispatch();
  const curPortionStartNum = useSelector((s) => s.table.curPortionStartNum);
  const sizePortion = useSelector((s) => s.table.sizePortionToLoad);

  const changePage = (event) => {
    dispatch(uploadData(+event.target.value, sizePortion));
  };

  return (
    <div className="pagination__button">
      <input
        id={`inputID_${info.start}`}
        name="pagination"
        type="radio"
        value={info.start}
        onChange={changePage}
        checked={+curPortionStartNum === +info.start}
      />
      <label htmlFor={`inputID_${info.start}`}>{info.title}</label>
    </div>
  );
};

PaginationButton.propTypes = {};

export default PaginationButton;
