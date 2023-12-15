import React, {useEffect, useState} from "react";
import classes from "./NameFilter.module.scss";
import {cardsApi} from "../services/CardsServise";
import {useDispatch} from "react-redux";
import {paintingsSlice} from "../store/reducers/paintingsSlice";
import {useAppSelector} from "../hooks/redux";
import {paintingsSliceTwo} from "../store/reducers/paintingsSlice1";
import useTheme from "../hooks/useTheme";


const NameFilter: React.FC = () => {
    const [nameFilter, setNameFilter] = useState<string | undefined>(undefined)
    const {darkMode} = useTheme()

    const dispatch = useDispatch()
    // const {
    //     authorFilter,
    //     locationFilter,
    //     startDateFilter,
    //     endDateFilter
    // } = useAppSelector(state => state.paintingsReducer)

    const {
        authorFilter,
        locationFilter,
        startDateFilter,
        endDateFilter
    } = useAppSelector(state => state.paintingsTwoReducer)
    const {currentPage, limit} = useAppSelector(state => state.paginationReducer)
    const {data} = cardsApi.useGetNameFilterQuery({
        name: nameFilter,
        authorId: authorFilter,
        locationId: locationFilter,
        startDate: startDateFilter,
        endDate: endDateFilter,
        page: currentPage,
        limit: limit
    })
    //
    //
    // useEffect(() => {

        //     if (data) {
        //         dispatch(paintingsSlice.actions.filterAction({
        //             paintingsus: data,
        //             author: authorFilter,
        //             location: locationFilter,
        //             name: nameFilter,
        //         }))
        //     }
        // }, [data,dispatch,
        //     authorFilter,
        //     locationFilter,
        //     nameFilter]);

    //     if (data) {
    //         dispatch(paintingsSlice.actions.filterAction({
    //             paintingsus: data,
    //             author: authorFilter,
    //             name: nameFilter,
    //             location: locationFilter,
    //             startDate: startDateFilter,
    //             endDate: endDateFilter
    //         }))
    //     }
    // }, [data,
    //     authorFilter,
    //     nameFilter,
    //     locationFilter,
    //     startDateFilter, endDateFilter]);
    useEffect(() => {
        if (data) {
        dispatch(paintingsSliceTwo.actions.nameFilter({name: nameFilter}))}
        dispatch(paintingsSliceTwo.actions.filterAction({paintingsus: data}))
    }, [data, nameFilter]);

    return (
        <div>
            <input type="text"
                   placeholder="Name"
                   value={nameFilter}
                   onChange={event => setNameFilter(event.target.value)}
                   className={`${classes.input} ${darkMode ? classes.input_dark : ''}`}
            />
        </div>
    );
}

export default NameFilter;
