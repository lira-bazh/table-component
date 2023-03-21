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

  const getStartNum = (index) => index * sizePortion;
  const getTitle = (index) => {
    const start = getStartNum(index);
    return `${start + 1}-${Math.min(+start + +sizePortion, sizeData)}`;
  };
  const getInfo = (index) => ({
    start: getStartNum(index),
    title: getTitle(index)
  });

  const showStartButton = curPortionStartNum - sizePortion > startNumData;
  const showCurrentButton =
    curPortionStartNum > startNumData &&
    curPortionStartNum < sizeData - sizePortion;
  const showNextButton = curPortionStartNum + 2*sizePortion < sizeData;

  const startButton = (
    <PaginationButton
      info={getInfo((+curPortionStartNum - +sizePortion) / sizePortion)}
    />
  )
  const currentButton = (
    <PaginationButton info={getInfo(curPortionStartNum / sizePortion)} />
  );
  const nextButton = (
    <PaginationButton
      info={getInfo((+curPortionStartNum + +sizePortion) / sizePortion)}
    />
  )

  const startInterval = showStartButton ? "..." : null;
  const endInterval = showNextButton ? "..." : null;

  return (
    <div className="pagination">
      {amountPages > 0 && (
        <>
          <PaginationButton info={getInfo(0)} />
          {startInterval}
          {showStartButton && startButton}
          {showCurrentButton && currentButton}
          {showNextButton && nextButton}
          {endInterval}
          <PaginationButton info={getInfo(amountPages - 1)} />
        </>
      )}
    </div>
  );
};

Pagination.propTypes = {};

export default Pagination;
