import React, {useEffect, useState} from 'react';
import classes from "./AuthorFilter.module.scss";
import {useDispatch} from "react-redux";
import {cardsApi} from "../services/CardsServise";
import {paintingsSlice} from "../store/reducers/paintingsSlice";
import {useAppSelector} from "../hooks/redux";
import arrow from "../pictures/arrowSelect_dark.svg";
import useTheme from "../hooks/useTheme";
import ButtonGroup from "./components/ButtonGroup";

const AuthorFilter: React.FC = () => {
    const [authorFilter, setAuthorFilter] = useState<number | undefined>(undefined)
    const [authorFilterName, setAuthorFilterName] = useState<string | undefined>(undefined)
    const {authors} = useAppSelector(state => state.authorsReducer)


    const dispatch = useDispatch()
    const {nameFilter, locationFilter, startDateFilter, endDateFilter} = useAppSelector(state => state.paintingsTwoReducer)
    const {currentPage, limit} = useAppSelector(state => state.paginationReducer)
    // const {data} = cardsApi.useGetNameFilterQuery({
    //     name: nameFilter,
    //     authorId: authorFilter,
    //     locationId: locationFilter,
    //     startDate: startDateFilter,
    //     endDate: endDateFilter,
    //     page: currentPage,
    //     limit: limit
    // })

    // useEffect(() => {

    //     if (data) {
    //         dispatch(paintingsSlice.actions.filterAction({
    //             paintingsus: data,
    //             name: nameFilter,
    //             location: locationFilter,
    //             author: authorFilter,
    //         }))
    //
    //     }
    // }, [data, authorFilter, nameFilter, locationFilter]);

    //     if (data ) {
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


    const [isOpen, setIsOpen] = useState(false)
    const handleOptionClick = (authorId: number, authorName: string) => {

        setAuthorFilter(authorId);
        setAuthorFilterName(authorName);

    }

    // const clearAuthorFilter = () => {
    //     setAuthorFilter(undefined)
    //     setAuthorFilterName(undefined)
    // }
    const {darkMode} = useTheme()


    return (
        <div className={`${classes.container} ${isOpen ? classes.container_open : ''} ${darkMode ? classes.container_dark : ''}`}
             onBlur={() => setIsOpen(false)}
             tabIndex={0}
             onClick={() => setIsOpen(prevState => !prevState)}>

            <span className={classes.container__name}>{authorFilterName ? authorFilterName : 'Author'}</span>

            {/*<div className={classes.container__buttons}>*/}

            {/*    <button*/}
            {/*        className={`${classes.clear_btn} ${authorFilterName == undefined ? classes.clear_btn__hide : ''}`}*/}
            {/*        onClick={event => {*/}
            {/*            event.stopPropagation()*/}
            {/*            clearAuthorFilter()*/}
            {/*        }}>*/}
            {/*        &times;*/}
            {/*    </button>*/}
            {/*    <div className={classes.container__arrow}>*/}
            {/*        <img src={arrow}*/}
            {/*             className={`${classes.container__arrow_img} ${isOpen ? classes.container__arrow_img_open : ''}`}/>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <ButtonGroup isOpen={isOpen}
                         filterName={authorFilterName}
                         setFilter={() => setAuthorFilter(undefined)}
                         setFilterName={() => setAuthorFilterName(undefined)}

            />

            <ul className={`${classes.options} ${isOpen ? classes.options_open : ''} ${darkMode ? classes.options_dark : ''}`}>
                {authors?.map((author) =>
                    <li value={author.id} key={author.id} className={`${classes.option}  ${darkMode ? classes.option_dark : ''}`}
                        onClick={() => handleOptionClick(author.id, author.name)}> {author.name} </li>)
                }
            </ul>

        </div>
    );
};

export default AuthorFilter;





//
//
// import React, {useEffect, useState} from 'react';
// import FilterDropdown from './components/FilterDropdown';
// import { useDispatch } from 'react-redux';
// import { paintingsSlice } from '../store/reducers/paintingsSlice';
// import { useAppSelector } from '../hooks/redux';
// import useTheme from '../hooks/useTheme';
// import {authorsSlice} from "../store/reducers/authorsSlice";
// import {cardsApi} from "../services/CardsServise";
//
// const AuthorFilterComponent: React.FC = () => {
//     const dispatch = useDispatch()
//     const {nameFilter, authorFilter, locationFilter} = useAppSelector(state => state.paintingsReducer)
//     const {currentPage, limit} = useAppSelector(state => state.paginationReducer)
//     const {data} = cardsApi.useGetNameFilterQuery({
//         name: nameFilter,
//         authorId: authorFilter,
//         locationId: locationFilter,
//         page: currentPage,
//         limit: limit
//     })
//
//     useEffect(() => {
//
//         if (data) {
//             dispatch(paintingsSlice.actions.filterAction({
//                 paintingsus: data,
//                 author: authorFilter,
//                 name: nameFilter,
//                 location: locationFilter
//             }))
//         }
//     }, [data, authorFilter, nameFilter, locationFilter]);
//     const { authors } = useAppSelector(state => state.authorsReducer);
//
//
//     return (
//         <FilterDropdown
//             filterType="Author"
//             filterItems={authors}
//         />
//     );
// };
//
// export default AuthorFilterComponent;