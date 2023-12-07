import React, {useEffect, useState} from 'react';
import classes from "./DateFilter.module.scss";
import arrow from "../pictures/selectArrow.svg";
import {useDispatch} from "react-redux";
import {cardsApi} from "../services/CardsServise";
import {useAppSelector} from "../hooks/redux";
import {paintingsSlice} from "../store/reducers/paintingsSlice";
import {IPages} from "../Pagination/MyPagination";

const DateFilter: React.FC<IPages> = ({limit}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [inputValueStart, setInputValueStart] = useState<string | undefined>(undefined);
    const [inputValueEnd, setInputValueEnd] = useState<string | undefined>(undefined);
    const  dispatch = useDispatch()
    const {currentPage} = useAppSelector(state => state.paginationReducer)
    const {nameFilter, authorFilter,  locationFilter} = useAppSelector(state => state.paintingsReducer)
    const {data} =  cardsApi.useGetNameFilterQuery({ name:nameFilter, authorId: authorFilter, locationId: locationFilter, startDate: inputValueStart, endDate: inputValueEnd, page: currentPage, limit})

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

    const dataSetStart = (start: string ) => {
        setInputValueStart(start)
        if ( inputValueEnd !== undefined) {
            if (+inputValueEnd < +start) {
                setError(true);
            } else {
                setError(false);

            }
    }}
    const dataSetEnd = ( end: string) => {
        setInputValueEnd(end)
        if (inputValueStart !== undefined) {
            if (+end < +inputValueStart) {
                setError(true);
            } else {
                setError(false);

            }
        }

    }

    // const {dates} = useAppSelector(state => state.dateReducer)
    // console.log(data)
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
                <div className={classes.inputs}>
                    <input id={'start'}
                           // type='text'
                           placeholder={'from'}
                           className={classes.input}
                           value={inputValueStart}
                          onClick={(event) => event.stopPropagation()}
                           onChange={(event)=> dataSetStart(event.target.value)}
                    >
                    </input>
                    <span className={classes.line}></span>
                    <input id={'end'}
                           placeholder={'before'}
                           className={classes.input}
                           value={inputValueEnd}
                           onClick={(event) => event.stopPropagation()}
                           onChange={(event)=> dataSetEnd(event.target.value)}
                    >
                    </input>
                </div>
                 <div className={`${classes.error} ${error ? classes.error_show : ''}`}>
                     Please write the end date later than the start date
                 </div>


                {/*{authors?.map((author) =>*/}
                {/*    <li value={author.id} key={author.id} className={classes.option}*/}
                {/*        onClick={() => handleOptionClick(author.id, author.name)}> {author.name} </li>)*/}
                {/*}*/}
            </div>
        </div>
    );
};

export default DateFilter;