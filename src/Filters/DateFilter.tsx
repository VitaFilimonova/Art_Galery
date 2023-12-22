import React, {useEffect, useRef, useState} from 'react';
import classes from "./DateFilter.module.scss";
import {useDispatch} from "react-redux";
import useTheme from "../hooks/useTheme";
import ButtonGroup from "./components/ButtonGroup";
import useVariables from "../hooks/useVariables";
import {paintingsSlice} from "../store/reducers/paintingsSlice";
import Input from "./components/Input";


const DateFilter: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [startDateFilter, setStartDateFilter] = useState<string | undefined>(undefined);
    const [endDateFilter, setEndDateFilter] = useState<string | undefined>(undefined);
    const dispatch = useDispatch()
    const {data} = useVariables()
    const {darkMode} = useTheme()
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (data) {
            dispatch(paintingsSlice.actions.filterAction({paintingsus: data}));
            dispatch(paintingsSlice.actions.dateFilter({startDate: startDateFilter, endDate: endDateFilter}))
        }
        if (startDateFilter && endDateFilter) {
            startDateFilter > endDateFilter ? setError(true) : setError(false)
        }
    }, [data, startDateFilter, endDateFilter]);

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <div
            className={`${classes.container} ${isOpen ? classes.container_open : ''} ${darkMode ? classes.container_dark : ''}`}
            ref={containerRef}
            tabIndex={0}
            onClick={() => {
                setIsOpen(prevState => !prevState);
            }}>
            <span className={classes.name}>Created</span>

            <ButtonGroup isOpen={isOpen}/>

            <div
                className={`${classes.options} ${isOpen ? classes.options_open : ''} ${darkMode ? classes.options_dark : ''}`}>
                <div className={classes.options__text}>Enter a 4-digit number date</div>
                <div className={classes.inputs}>

                    <Input
                        id={'start'}
                        placeholder={'from'}
                        value={startDateFilter}
                        dateSetFilter={setStartDateFilter}
                        setErrorFilter={setError}
                    />

                    <span className={classes.line}></span>

                    <Input
                        id={'end'}
                        placeholder={'before'}
                        value={endDateFilter}
                        dateSetFilter={setEndDateFilter}
                        setErrorFilter={setError}
                    />
                </div>

                <div
                    className={`${classes.error} ${error ? classes.error_open : ''} ${darkMode ? classes.error_dark : ''}`}>
                    Invalid date, please, revise it
                </div>
            </div>
        </div>
    );
};

export default DateFilter;