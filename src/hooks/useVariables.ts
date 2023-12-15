// import React, {useEffect} from 'react';
// import {useDispatch} from "react-redux";
// import {useAppSelector} from "./redux";
// import {cardsApi} from "../services/CardsServise";
// import {paintingsSlice} from "../store/reducers/paintingsSlice";
// import {paintingsSliceTwo} from "../store/reducers/paintingsSlice1";
//
// interface useVariablesProps {
//     activeFilter?:  any;
// }
//
// const useVariables = ({activeFilter} :useVariablesProps) => {
//     const dispatch = useDispatch()
//     const {currentPage, limit} = useAppSelector(state => state.paginationReducer)
//
//     const {nameFilter, authorFilter,locationFilter, startDateFilter, endDateFilter} = useAppSelector(state => state.paintingsTwoReducer)
//
//     const {data} = cardsApi.useGetNameFilterQuery({
//         name: nameFilter,
//         authorId: authorFilter,
//         locationId: locationFilter,
//         startDate: startDateFilter,
//         endDate: endDateFilter,
//         page: currentPage,
//         limit: limit
//     })
// console.log(activeFilter.)
//     // useEffect(() => {
//     //     if (data) {
//     //         dispatch(paintingsSliceTwo.actions.filterAction({
//     //             paintingsus: data,
//     //             author: authorFilter,
//     //             name: nameFilter,
//     //             location: locationFilter,
//     //             startDate: startDateFilter,
//     //             endDate: endDateFilter
//     //         }))
//     //     }
//     //
//     // }, [ data,
//     //     activeFilter]);
//     return {
//         filterValue: useAppSelector((state) => state.paintingsTwoReducer[activeFilter.toLowerCase()]),
//         setFilter: (value: any) => dispatch(paintingsSlice.actions.filterAction.))
//     }
//
// };
//
// export default useVariables;