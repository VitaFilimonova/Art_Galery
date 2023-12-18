import React, {useEffect, useState} from 'react';
import classes from "./DateFilter.module.scss";
import arrow from "../pictures/selectArrow.svg";
import {useDispatch} from "react-redux";
import {cardsApi} from "../services/CardsServise";
import {useAppSelector} from "../hooks/redux";
import {paintingsSlice} from "../store/reducers/paintingsSlice";


const DateFilter: React.FC= () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [inputValueStart, setInputValueStart] = useState<string | undefined>(undefined);
    const [inputValueEnd, setInputValueEnd] = useState<string | undefined>(undefined);
    const  dispatch = useDispatch()
    const {currentPage, limit} = useAppSelector(state => state.paginationReducer)
    const {nameFilter, authorFilter,  locationFilter} = useAppSelector(state => state.paintingsReducer)
    const {data} =  cardsApi.useGetNameFilterQuery({ name:nameFilter, authorId: authorFilter, locationId: locationFilter, startDate: inputValueStart, endDate: inputValueEnd, page: currentPage, limit: limit})

    useEffect(() => {

        if (data && inputValueStart !== '' && inputValueEnd !== '') {
            dispatch(paintingsSlice.actions.filterAction({
                paintingsus: data,
                author: authorFilter,
                name: nameFilter,
                location: locationFilter,
                startDate: inputValueStart,
                endDate: inputValueEnd}))
        }
    }, [ data, authorFilter, nameFilter, locationFilter, inputValueStart, inputValueEnd]);


    const dataSetStart = (start: string | undefined) => {

        if ( start && start.length == 4) {
            setInputValueStart(start)
            setError(false)
            checkError()
        } else {
            setInputValueStart(undefined)
            setError(true)
        }

    }
    const dataSetEnd = ( end: string | undefined) => {

        if ( end && end.length == 4) {
            setInputValueEnd(end)
            setError(false)
            checkError()

        } else {
            setInputValueEnd(undefined)
            setError(true)

        }

    }

    const checkError =( ) => {
        if ( inputValueStart != undefined && inputValueEnd != undefined) {
            console.log('spsps')
            if (+ inputValueStart > +inputValueEnd) {
                setError(true)
            }
        }

    }

    return (
        <div  className={`${classes.container} ${isOpen ? classes.container__open : ''}`}
            // onBlur={()=> setIsOpen(false)}
            // onFocus={()=> setIsOpen(false)}
              tabIndex={0}
              onClick={()=> {setIsOpen(prevState => !prevState);
              }}>
            <span className={classes.name}>Created</span>
            <div className={classes.buttons}>
                <div className={classes.carette} >
                    <img src={arrow} className={`${classes.carette_img} ${isOpen ? classes.carette_img__open : ''}`} />
                </div>
            </div>

            <div className={`${classes.options} ${isOpen ? classes.show : ''}`}>
                <div className={classes.text}>Write a 4-digit date number</div>
                <div className={classes.inputs}>
                    <input id={'start'}
                        // type='text'
                           placeholder={'from'}
                           className={classes.input}
                           value={inputValueStart}
                           onClick={(event) => event.stopPropagation()}
                           onChange={(event) => dataSetStart(event.target.value)}
                    >
                    </input>
                    <span className={classes.line}></span>
                    <input id={'end'}
                           placeholder={'before'}
                           className={classes.input}
                           value={inputValueEnd}
                           onClick={(event) => event.stopPropagation()}
                           onChange={(event) => dataSetEnd(event.target.value)}
                    >
                    </input>
                </div>
                <div className={`${classes.error} ${error ? classes.error_show : ''}`}>
                    Please write the end date later than the start date or check data length
                </div>

            </div>
        </div>
    );
};

export default DateFilter;