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
}

const PaginationArrow: React.FC<PaginationArrowsProps> = ({handlePageChange, currentPageNumber, image, pageChange}) => {
    const {currentPage} = useAppSelector(state => state.paginationReducer);
    const {darkMode} = useTheme()
    return (
        <>
            <button className={`${classes.button} ${darkMode ? classes.button_dark : ''}`}
                    onClick={() => handlePageChange(pageChange)}
                    disabled={currentPage === currentPageNumber}>
                <img src={image} className={classes.button__img} alt={'arrow'}/>
            </button>
        </>
    );
};

export default PaginationArrow;