import React, {useEffect, useState} from 'react';
import classes from "./DateFilter.module.scss";
import arrow from "../pictures/arrowSelect_dark.svg";
import {useDispatch} from "react-redux";
import {cardsApi} from "../services/CardsServise";
import {useAppSelector} from "../hooks/redux";
import {paintingsSlice} from "../store/reducers/paintingsSlice";
import useTheme from "../hooks/useTheme";
import ButtonGroup from "./components/ButtonGroup";
import useVariables from "../hooks/useVariables";
import {paintingsSliceTwo} from "../store/reducers/paintingsSlice1";
import Input from "./components/Input";


const DateFilter: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [startDateFilter, setStartDateFilter] = useState<string | undefined>(undefined);
    const [endDateFilter, setEndDateFilter] = useState<string | undefined>(undefined);
    const dispatch = useDispatch()
    const {data} = useVariables()

    // const {currentPage, limit} = useAppSelector(state => state.paginationReducer)
    // const {nameFilter, authorFilter, locationFilter} = useAppSelector(state => state.paintingsReducer)
    // const {data} = cardsApi.useGetNameFilterQuery({
    //     name: nameFilter,
    //     authorId: authorFilter,
    //     locationId: locationFilter,
    //     startDate: startDateFilter,
    //     endDate: endDateFilter,
    //     page: currentPage,
    //     limit: limit
    // })

    useEffect(() => {

        if (data) {
            dispatch(paintingsSliceTwo.actions.filterAction({paintingsus: data}));
            dispatch(paintingsSliceTwo.actions.dateFilter({startDate: startDateFilter, endDate: endDateFilter}))
        }
    }, [data, startDateFilter, endDateFilter]);


    const dataSetStart = (start: string | undefined) => {
        console.log(start)
        if (start && start.length == 4 && !isNaN(Number(start))) {
            setStartDateFilter(start)
            setError(false)
            // checkError()
            // }
            // if (start && start.length ==0) {
            //     setInputValueStart(undefined)
            // }
        } else {
            setStartDateFilter(undefined)
            setError(true)
            // checkError()
        }
        checkError()
    }
    const dataSetEnd = (end: string | undefined) => {
        console.log(end)
        if (end && end.length == 4 && !isNaN(Number(end))) {
            setEndDateFilter(end)
            setError(false)
            // checkError()

        } else {
            setEndDateFilter(undefined)
            setError(true)
            // checkError()
        }
        checkError()


    }

    const checkError = () => {
        if (startDateFilter?.length === 4 && endDateFilter?.length === 4) {
            (Number(startDateFilter) < Number(endDateFilter)) ? setError(false) : setError(true)
            console.log('gagag')
        }
        if (startDateFilter?.length === 0 && endDateFilter?.length === 0) {
            setError(false)
        }
    }

console.log(useAppSelector(state => state.paintingsTwoReducer.activeFilter))
    // const checkError = () => {
    //  if (startDateFilter !==undefined && endDateFilter !==undefined) {
    //      (+startDateFilter < +endDateFilter) ? setError(false) : setError(true)
    //      console.log('haha')
    //  }


    const {darkMode} = useTheme()

    return (
        <div
            className={`${classes.container} ${isOpen ? classes.container_open : ''} ${darkMode ? classes.container_dark : ''}`}
            // onBlur={()=> setIsOpen(false)}
            // onFocus={()=> setIsOpen(false)}
            tabIndex={0}
            onClick={() => {
                setIsOpen(prevState => !prevState);
            }}>
            <span className={classes.name}>Created</span>

            <ButtonGroup isOpen={isOpen}/>

            <div
                className={`${classes.options} ${isOpen ? classes.options_open : ''} ${darkMode ? classes.options_dark : ''}`}>
                <div className={classes.options__text}>Write a 4-digit date number</div>
                <div className={classes.inputs}>
                   <Input id={'start'} placeholder={'from'} value={startDateFilter}
                          // dataSet={()=> dataSetStart()}
                   />

                    <span className={classes.line}></span>
                    <input id={'end'}
                           placeholder={'before'}
                           className={classes.input}
                           value={endDateFilter}
                           onClick={(event) => event.stopPropagation()}
                           onChange={(event) => dataSetEnd(event.target.value)}
                    >
                    </input>
                </div>
                <div className={`${classes.error} ${error ? classes.error_open : ''}`}>
                    Please write the end date later than the start date or check data length
                </div>

            </div>
        </div>
    );
};

export default DateFilter;