import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setCurrentPage, setTotalPages} from "../store/reducers/paginationSlice";
import classes from './Pagination.module.scss'
import doubleArrLeft from './../pictures/doubleArrowL.svg'
import arrLeft from './../pictures/arrow_left.svg'
import doubleArrRight from './../pictures/doubleArrowR.svg'
import arrRight from './../pictures/arrow_right.svg'
import {cardsApi, useGetPaintingsQuery} from "../services/CardsServise";
import useTheme from "../hooks/useTheme";
import useVariables from ".././hooks/useVariables";
import PaginationArrow from "./PaginationArrow";


const Pagination: React.FC = () => {
    const limit = useAppSelector(state => state.paginationReducer.limit)
    const {data, isLoading} = useGetPaintingsQuery({limit})
    const {currentPage, totalPages} = useAppSelector(state => state.paginationReducer);
    const {activeFilter} = useAppSelector(state => state.paintingsTwoReducer);
    const dispatch = useAppDispatch();

    const {darkMode} = useTheme()

    const {dataWithoutLimit} = useVariables()
    useEffect(
        () => {

            if (!isLoading && data) {
                if (activeFilter && dataWithoutLimit) {
                    const pages = Math.ceil(dataWithoutLimit.length / limit)
                    dispatch(setTotalPages(pages))
                    dispatch(setCurrentPage(1))
                } else {
                    const pages = Math.ceil(data.length / limit)
                    dispatch(setTotalPages(pages))
                }
            }
        }, [data, limit, dataWithoutLimit, isLoading]);
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            dispatch(setCurrentPage(page));
        }
    }

    const visiblePages = useMemo(() => {
        const numVisiblePages = 3; // Number of visible page buttons
        const halfNumVisiblePages = Math.floor(numVisiblePages / 2);

        // Calculate the start and end of the visible range
        let start = Math.max(1, currentPage - halfNumVisiblePages);
        let end = Math.min(totalPages, start + numVisiblePages - 1);

        // Adjust the start if we're near the end
        start = Math.max(1, end - numVisiblePages + 1);

        const visiblePagesArray: number[] = [];
        for (let i = start; i <= end; i++) {
            visiblePagesArray.push(i);
        }

        return visiblePagesArray;
    }, [currentPage, totalPages]);

    return (
        <div className={classes.container}>

            {/*<button className={classes.button_arrow} onClick={() => handlePageChange(1)}*/}
            {/*        disabled={currentPage === 1}>*/}
            {/*    <img src={doubleArrLeft} className={classes.button_img} alt={'doubleArrowLeft'}/>*/}
            {/*</button>*/}
            {/*<button className={classes.button_arrow} onClick={() => handlePageChange(currentPage - 1)}*/}
            {/*        disabled={currentPage === 1}>*/}
            {/*    <img src={arrLeft} className={classes.button_img} alt={'arrowLeft'}/>*/}
            {/*</button>*/}

            <PaginationArrow handlePageChange={handlePageChange} currentPageNumber={1} image={doubleArrLeft} pageChange={1} />
            <PaginationArrow handlePageChange={handlePageChange} currentPageNumber={1} image={arrLeft} pageChange={currentPage - 1}/>


            {visiblePages.map((page) => (
                <button
                    key={page}
                    className={`${classes.button} ${currentPage === page ? classes.button_active : ''}`}
                    onClick={() => handlePageChange(page)}
                    disabled={currentPage === page}
                >
                    {page}
                </button>))}

            <PaginationArrow handlePageChange={handlePageChange} currentPageNumber={totalPages} image={arrRight} pageChange={currentPage + 1} />
            <PaginationArrow handlePageChange={handlePageChange} currentPageNumber={totalPages} image={doubleArrRight} pageChange={totalPages}/>


            {/*<button className={classes.button_arrow} onClick={() => handlePageChange(currentPage + 1)}*/}
            {/*        disabled={currentPage === totalPages}>*/}
            {/*    <img src={arrRight} className={classes.button_img} alt={'arrowRight'}/>*/}
            {/*</button>*/}

            {/*<button className={classes.button_arrow} onClick={() => handlePageChange(totalPages)}*/}
            {/*        disabled={currentPage === totalPages}>*/}
            {/*    <img src={doubleArrRight} className={classes.button_img} alt={'doubleArrowRight'}/>*/}
            {/*</button>*/}
        </div>

    );
};

export default Pagination;
