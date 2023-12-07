import { FC } from 'react';

import PaginationPageWithActive from './PaginationPageWithActive';

import  DoubleArrowL  from './../pictures/doubleArrowL.svg';
import  ArrowR  from '../pictures/arrow_left.svg';
import  DoubleArrowR  from '../pictures/arrow_left.svg';


import classes from './Pagination.module.scss';
import usePaginationSlice from "../store/reducers/usePaginationSlice";
import PaginationPage from "./Pagination";

export type TPagination = {
  /**
   * Current theme
   */
  isDarkTheme?: boolean;
  /**
   * The total number of items
   */
  pagesAmount: number;
  /**
   * The current page
   */
  currentPage: number;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * The callback function called when the current page changes
   */
  onChange: (currentPage: number) => void;
};

const Pagination: FC<TPagination> = ({
  currentPage,
  isDarkTheme = false,
  pagesAmount,
  className,
  onChange
}) => {
  const slicedPagesArray = usePaginationSlice({
    current: currentPage,
    amount: pagesAmount
  });

  const leftArrowProps = {
    isDarkTheme,
    disabled: currentPage < 2,
    src: DoubleArrowL
  };

  const rightArrowProps = {
    isDarkTheme,
    disabled: currentPage >= pagesAmount
  };

  return (
    <div className={classes.Pagination}>
      <PaginationPage {...leftArrowProps} onClick={() => onChange(1)}>
        <img src={DoubleArrowL} style={{width: "30px",height: "30px" }}/>
      </PaginationPage>
      <PaginationPage {...leftArrowProps} onClick={() => onChange(currentPage - 1)}>
        {/*<img src={arrow_left} />*/}
      </PaginationPage>

      {slicedPagesArray.map((el) => (
        <PaginationPageWithActive
          isDarkTheme={isDarkTheme}
          onClick={() => onChange(el)}
          isActive={currentPage === el}
          key={el}>
          {el}
        </PaginationPageWithActive>
      ))}
      <PaginationPage {...rightArrowProps} onClick={() => onChange(currentPage + 1)}>
        <ArrowR />
      </PaginationPage>
      <PaginationPage {...rightArrowProps} onClick={() => onChange(pagesAmount)}>
        <DoubleArrowR />
      </PaginationPage>
    </div>
  );
};

// export default Pagination;
// import {FC} from "react";
//
// import { FC } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
//
//
// import classes from './Pagination.module.scss';
// import usePaginationSlice from '../store/reducers/usePaginationSlice';
// import {useAppSelector} from "../hooks/redux";
// import {setCurrentPage} from "../store/reducers/paginationSlice";
//
// export interface PaginationProps {
//   isDarkTheme?: boolean;
//   className?: string;
// }
//
// const Pagination: FC<PaginationProps> = ({ isDarkTheme = false, className }) => {
//   const dispatch = useDispatch();
//   const currentPage = useAppSelector(state => state.paginationReducer.currentPage);
//   const pagesAmount = useAppSelector(state => state.paginationReducer.totalPages);
//
//   const pagesArray = usePaginationSlice({
//     current: currentPage,
//     amount: pagesAmount,
//   });
//
//   const leftArrowProps = {
//     isDarkTheme,
//     disabled: currentPage < 2,
//     onClick: () => changePage(1),
//   };
//
//   const rightArrowProps = {
//     isDarkTheme,
//     disabled: currentPage >= pagesAmount,
//     onClick: () => changePage(currentPage + 1),
//   };
//
//   const changePage = (page: number) => {
//     if (page >= 1 && page <= pagesAmount) {
//       dispatch(setCurrentPage(page));
//     }
//   };
//
//   return (
//       <div className={classes.Pagination}>
//         <button {...leftArrowProps}>Previous</button>
//         {pagesArray.map((el) => (
//             <button
//                 key={el}
//                 onClick={() => changePage(el)}
//                 className={currentPage === el ? classes.Active : ''}
//             >
//               {el}
//             </button>
//         ))}
//         <button {...rightArrowProps}>Next</button>
//         <DoubleArrowR />
//       </div>
//   );
// };

export default Pagination;