import React, {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setCurrentPage, setTotalPages} from "../store/reducers/paginationSlice";
import classes from './MyPagination.module.scss'
import doubleArrLeft from './../pictures/doubleArrowL.svg'
import arrLeft from './../pictures/arrow_left.svg'
import doubleArrRight from './../pictures/doubleArrowR.svg'
import arrRight from './../pictures/arrow_right.svg'
import {cardsApi, useGetPaintingsQuery} from "../services/CardsServise";


const MyPagination: React.FC = () => {
    const limit = useAppSelector(state => state.paginationReducer.limit)
    const {data} = useGetPaintingsQuery({limit})
    const {currentPage, totalPages} = useAppSelector(state => state.paginationReducer);
    const { nameFilter, authorFilter,locationFilter, startDateFilter, endDateFilter, activeFilter} = useAppSelector(state => state.paintingsReducer);
    const dispatch = useAppDispatch();
    const {data: dataPagination} = cardsApi.useGetNameFilterQuery({locationId: locationFilter, authorId: authorFilter, name: nameFilter, startDate: startDateFilter, endDate: endDateFilter })


    useEffect(() => {
        if ( data) {
            if (activeFilter && dataPagination) {
                const pages = Math.ceil(dataPagination.length / limit)
                dispatch(setTotalPages(pages))
                dispatch(setCurrentPage(1))
            }
            else {
                const pages = Math.ceil(data.length / limit)
                dispatch(setTotalPages(pages))
            }
        }
    }, [ data, limit, dataPagination]);


    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            // Обновляем текущую страницу в хранилище Redux
            console.log('Changing to Page:', page); // Добавьте логирование для изменения страницы
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
        <div>
            <div className={classes.container}>
                <button className={classes.button_arrow} onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}>
                    <img src={doubleArrLeft} className={classes.button_img}/>
                </button>
                <button className={classes.button_arrow} onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>
                    <img src={arrLeft} className={classes.button_img}/>
                </button>

                {visiblePages.map((page) => (
                    <button
                        key={page}
                        className={`${classes.button} ${currentPage === page ? classes.button_active : ''}`}
                        onClick={() => handlePageChange(page)}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>))}



                <button className={classes.button_arrow} onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}>
                    <img src={arrRight} className={classes.button_img}/>
                </button>
                <button className={classes.button_arrow} onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}>
                    <img src={doubleArrRight} className={classes.button_img}/>
                </button>
            </div>
        </div>
    );
};

export default MyPagination;
