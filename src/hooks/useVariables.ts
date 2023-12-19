import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useAppSelector} from "./redux";
import {cardsApi} from "../services/CardsServise";
import {paintingsSliceTwo} from "../store/reducers/paintingsSlice1";
// import {paintingsSlice} from "../store/reducers/paintingsSlice";
// import {paintingsSliceTwo} from "../store/reducers/paintingsSlice1";

// interface useVariablesProps {
//     activeFilter?:  any;
// }

const useVariables = () => {
    const {currentPage, limit} = useAppSelector(state => state.paginationReducer)
const dispatch = useDispatch()
    const {nameFilter, authorFilter,locationFilter, startDateFilter, endDateFilter} = useAppSelector(state => state.paintingsTwoReducer)

    const {data} = cardsApi.useGetNameFilterQuery({
        name: nameFilter,
        authorId: authorFilter,
        locationId: locationFilter,
        startDate: startDateFilter,
        endDate: endDateFilter,
        page: currentPage,
        limit: limit
    })
    const {data: dataWithoutLimit} = cardsApi.useGetNameFilterQuery({
        name: nameFilter,
        authorId: authorFilter,
        locationId: locationFilter,
        startDate: startDateFilter,
        endDate: endDateFilter,
    })
    useEffect(() => {
        if (data) {
            dispatch(paintingsSliceTwo.actions.filterAction({paintingsus: data}))
        }
    }, [data]);


    return {
        data,
        dataWithoutLimit
    }

};

export default useVariables;