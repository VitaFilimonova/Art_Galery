import React from 'react';
import classes from "./PaginationArrow.module.scss";
import doubleArrLeft from "../pictures/doubleArrowL.svg";
import arrLeft from "../pictures/arrow_left.svg";
import {useAppSelector} from "../hooks/redux";
import {useDispatch} from "react-redux";
import useTheme from "../hooks/useTheme";


interface PaginationArrowsProps {
    pageChange: number;
    handlePageChange: (page: number) => void;
    currentPageNumber: number;
    image: string;
    isFirst?: boolean;
    isLast?: boolean;
    currPage: any;
}

const PaginationArrow: React.FC<PaginationArrowsProps> = ({
                                                              handlePageChange,
                                                              currentPageNumber,
                                                              image,
                                                              pageChange,
                                                              isFirst,
                                                              isLast,
                                                              currPage
                                                          }) => {
    const firstElem = isFirst ? classes.button_first : ''
    const lastElem = isLast ? classes.button_last : ''


    const {darkMode} = useTheme()
    return (
        <>
            <button className={`${classes.button} ${darkMode ? classes.button_dark : ''} ${firstElem || lastElem}`}
                    onClick={() => handlePageChange(pageChange)}
                    disabled={currPage === currentPageNumber}>
                <img src={image} className={`${classes.button__img} ${darkMode ? classes.button__img_dark : ''}`}
                     alt={'arrow'}/>
            </button>
        </>
    );
};

export default PaginationArrow;