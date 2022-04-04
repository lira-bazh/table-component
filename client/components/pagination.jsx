import React from "react";
import { useSelector } from "react-redux";
import PaginationButton from "./paginationButton";
import "./pagination.scss";

const Pagination = () => {
  const startNumData = useSelector((s) => s.table.startNumData);
  const sizeData = useSelector((s) => s.table.sizeData);
  const curPortionStartNum = useSelector((s) => s.table.curPortionStartNum);
  const sizePortion = useSelector((s) => s.table.sizePortionToLoad);

  const amountPages = Math.ceil((sizeData - startNumData) / sizePortion);

  const pages = new Array(amountPages).fill(0).map((item, index) => {
    const start = sizePortion * index;
    const end = Math.min(+start + +sizePortion, sizeData)
    return {
      start: start,
      title: `${start + 1}-${end}`,
    };
  });

  let startButton = "";
  if (curPortionStartNum - sizePortion > startNumData) {
    startButton = (
      <PaginationButton
        info={
          pages[
            (+curPortionStartNum - +sizePortion) / sizePortion
          ]
        }
      />
    );
  }
  let currentButton = '';
  if (
    curPortionStartNum > startNumData &&
    curPortionStartNum < sizeData - sizePortion
  ) {
    currentButton = (
      <PaginationButton info={pages[curPortionStartNum / sizePortion]} />
    );
  }
  let nextButton = ''
  if (curPortionStartNum + sizePortion < sizeData) {
    nextButton = (
      <PaginationButton
        info={
          pages[(+curPortionStartNum + +sizePortion) / sizePortion]
        }
      />
    );
  }

  const startInterval = curPortionStartNum - startNumData > sizePortion? '...' : '';
  const endInterval = sizeData - curPortionStartNum > sizePortion ? "..." : "";

  if (pages.length > 0) {
    return (
      <div className="pagination">
        <PaginationButton info={pages[0]} />
        {startInterval}
        {startButton}
        {currentButton}
        {nextButton}
        {endInterval}
        <PaginationButton info={pages[pages.length - 1]} />
      </div>
    );
  }
  return <div className="pagination"></div>;
};

Pagination.propTypes = {};

export default Pagination;
