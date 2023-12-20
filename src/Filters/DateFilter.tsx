import React, {useEffect, useState} from 'react';
import classes from "./DateFilter.module.scss";
import {useDispatch} from "react-redux";
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
    const {darkMode} = useTheme()

    useEffect(() => {
        if (data) {
            dispatch(paintingsSliceTwo.actions.filterAction({paintingsus: data}));
            dispatch(paintingsSliceTwo.actions.dateFilter({startDate: startDateFilter, endDate: endDateFilter}))
        }
        if (startDateFilter && endDateFilter) {
            startDateFilter > endDateFilter ? setError(true) : setError(false)
        }
    }, [data, startDateFilter, endDateFilter]);


    const dataSetStart = (start: string | undefined) => {
        if (start && start.length == 4 && !isNaN(Number(start))) {
            setStartDateFilter(start)
            setError(false)

        } else if (start?.length == 0) {
            setError(false)

        } else {
            setStartDateFilter(undefined)
            setError(true)
        }
    }
    const dataSetEnd = (end: string | undefined) => {
        if (end && end.length == 4 && !isNaN(Number(end))) {
            setEndDateFilter(end)
            setError(false)

        } else if (end?.length == 0) {
            setError(false)

        } else {
            setEndDateFilter(undefined)
            setError(true)
        }
    }

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

                    <Input
                        id={'start'}
                        placeholder={'from'}
                        value={startDateFilter}
                        // dateSetFilter={dataSetStart}
                        dateSetFilter={setStartDateFilter}
                        setErrorFilter={setError}
                    />

                    {/*<input id={'start'}*/}
                    {/*       placeholder={'from'}*/}
                    {/*       className={classes.input}*/}
                    {/*       value={startDateFilter}*/}
                    {/*       onClick={(event) => event.stopPropagation()}*/}
                    {/*       onChange={(event) => dataSetStart(event.target.value)}*/}
                    {/*>*/}
                    {/*</input>*/}

                    <span className={classes.line}></span>

                    <Input
                        id={'end'}
                        placeholder={'before'}
                        value={endDateFilter }
                        dateSetFilter={ setEndDateFilter}
                        setErrorFilter={ setError}
                    />

                    {/*<input id={'end'}*/}
                    {/*       placeholder={'before'}*/}
                    {/*       className={classes.input}*/}
                    {/*       value={endDateFilter}*/}
                    {/*       onClick={(event) => event.stopPropagation()}*/}
                    {/*       onChange={(event) => dataSetEnd(event.target.value)}*/}
                    {/*>*/}
                    {/*</input>*/}
                </div>

                <div className={`${classes.error} ${error ? classes.error_open : ''}`}>
                    Please write the end date later than the start date or check data length
                </div>

            </div>
        </div>
    );
};

export default DateFilter;