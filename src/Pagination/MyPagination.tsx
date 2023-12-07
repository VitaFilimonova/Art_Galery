import React, {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setCurrentPage, setTotalPages} from "../store/reducers/paginationSlice";
import classes from './MyPagination.module.scss'
import doubleArrLeft from './../pictures/doubleArrowL.svg'
import arrLeft from './../pictures/arrow_left.svg'
import doubleArrRight from './../pictures/doubleArrowR.svg'
import arrRight from './../pictures/arrow_right.svg'
import {cardsApi, useGetPaintingsQuery} from "../services/CardsServise";
import {paintingsSlice} from "../store/reducers/paintingsSlice";

export interface IPages {
    // totalPages: number;
    limit: number;
    // pages: number;
    // currentPage: number
}

const MyPagination: React.FC<IPages> = ({limit}) => {

    const {data} = useGetPaintingsQuery({})
    const currentPage = useAppSelector(state => state.paginationReducer.currentPage);
    const totalPages = useAppSelector(state => state.paginationReducer.totalPages);
    const dispatch = useAppDispatch();
    const paints = useAppSelector(state => state.paintingsReducer.paintings)


    useEffect(() => {
        if (data) {
            if (data.length !== paints.length) {
                const pages = Math.ceil(data.length / limit)
                dispatch(setTotalPages(pages))

            } else {
                const pages = Math.ceil(paints.length / limit)
                dispatch(setTotalPages(pages))
            }
        }
console.log(totalPages)
    }, [data, limit, paints]);

    // useEffect(() => {
    //     if (data && nameFilter != '') {
    //         // authorFilter ?
    //         dispatch(paintingsSlice.actions.filterAction( {
    //             paintingsus: data,
    //             author: authorFilter,
    //             location: locationFilter,
    //             name: nameFilter
    //
    //         }))
    //         // :  dispatch(paintingsSlice.actions.filterAction( {paintingsus: data}))
    //     }
    //     console.log('nameFil')
    // }, [data, authorFilter, nameFilter, locationFilter]);


    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            // Обновляем текущую страницу в хранилище Redux
            console.log('Changing to Page:', page); // Добавьте логирование для изменения страницы
            dispatch(setCurrentPage(page));
        }
    }

    const pages = useMemo(() => {
        const calculatedPages: number[] = [];
        for (let i = 1; i <= totalPages; i++) {
            calculatedPages.push(i);
        }
        return calculatedPages;
    }, [totalPages]);

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


                {/*{pages.map((page) => (*/}
                {/*    <button*/}
                {/*        key={page}*/}
                {/*        className={`${classes.button} ${currentPage === page ? classes.button_active : ''}`}*/}
                {/*        onClick={() => handlePageChange(page)}*/}
                {/*        disabled={currentPage === page}*/}
                {/*    >*/}
                {/*        {page}*/}
                {/*    </button>))}*/}


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
