import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadData } from "../redux/reducers/table";
import "./paginationButton.scss";

const PaginationButton = (props) => {
  const dispatch = useDispatch();
  const curPortionStartNum = useSelector((s) => s.table.curPortionStartNum);
  const sizePortion = useSelector((s) => s.table.sizePortionToLoad);

  const changePage = (event) => {
    dispatch(uploadData(event.target.value, sizePortion));
  };

  return (
    <div className="pagination__button">
      <input
        id={`inputID_${props.info.start}`}
        name="pagination"
        type="radio"
        value={props.info.start}
        onChange={changePage}
        checked={+curPortionStartNum === +props.info.start}
      />
      <label htmlFor={`inputID_${props.info.start}`}>{props.info.title}</label>
    </div>
  );
};

PaginationButton.propTypes = {};

export default PaginationButton;
