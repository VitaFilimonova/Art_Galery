import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setCurrentPage,
  setTotalPages,
} from "../store/reducers/paginationSlice";
import classes from "./Pagination.module.scss";
import doubleArrLeft from "../pictures/doubleArrowL.svg";
import arrLeft from "../pictures/arrow_left.svg";
import doubleArrRight from "../pictures/doubleArrowR.svg";
import arrRight from "../pictures/arrow_right.svg";
import { useGetPaintingsQuery } from "../services/CardsServise";
import useTheme from "../hooks/useTheme";
import useVariables from "../hooks/useVariables";
import PaginationArrow from "./PaginationArrow";

const Pagination: React.FC = () => {
  const limit = useAppSelector((state) => state.paginationReducer.limit);
  const { data } = useGetPaintingsQuery({ limit });
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.paginationReducer,
  );
  const activeFilter = useAppSelector((state) => state.paintingsReducer);
  const dispatch = useAppDispatch();
  const { darkMode } = useTheme();
  const { dataWithoutLimit } = useVariables();

  useEffect(() => {
    if (data && dataWithoutLimit) {
      if (activeFilter) {
        const pages = Math.ceil(dataWithoutLimit.length / limit);
        dispatch(setTotalPages(pages));
        dispatch(setCurrentPage(1));
      } else {
        const pages = Math.ceil(data.length / limit);
        dispatch(setTotalPages(pages));
      }
    }
  }, [data, limit, dataWithoutLimit]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const visiblePages = useMemo(() => {
    const numVisiblePages = 3;
    const halfNumVisiblePages = Math.floor(numVisiblePages / 2);

    let start = Math.max(1, currentPage - halfNumVisiblePages);
    const end = Math.min(totalPages, start + numVisiblePages - 1);

    start = Math.max(1, end - numVisiblePages + 1);

    const visiblePagesArray: number[] = [];
    for (let i = start; i <= end; i++) {
      visiblePagesArray.push(i);
    }

    return visiblePagesArray;
  }, [currentPage, totalPages]);

  return (
    <div className={classes.container}>
      <PaginationArrow
        handlePageChange={handlePageChange}
        currentPageNumber={1}
        image={doubleArrLeft}
        pageChange={1}
        isFirst
        currPage={currentPage}
      />
      <PaginationArrow
        handlePageChange={handlePageChange}
        currentPageNumber={1}
        image={arrLeft}
        pageChange={currentPage - 1}
        currPage={currentPage}
      />

      {visiblePages.map((page) => (
        <button
          type="button"
          key={page}
          className={`${classes.button} ${
            currentPage === page ? classes.button_active : ""
          } ${darkMode ? classes.button_dark : ""}`}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}

      <PaginationArrow
        handlePageChange={handlePageChange}
        currentPageNumber={totalPages}
        image={arrRight}
        pageChange={currentPage + 1}
        currPage={currentPage}
      />
      <PaginationArrow
        handlePageChange={handlePageChange}
        currentPageNumber={totalPages}
        image={doubleArrRight}
        pageChange={totalPages}
        isLast
        currPage={currentPage}
      />
    </div>
  );
};

export default Pagination;
