import React, {useEffect, useState} from 'react';
import classes from "./AuthorFilter.module.scss";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../hooks/redux";
import {cardsApi} from "../services/CardsServise";
import {paintingsSlice} from "../store/reducers/paintingsSlice";
import arrow from "../pictures/arrowSelect_dark.svg";
import useTheme from "../hooks/useTheme";
import ButtonGroup from "./components/ButtonGroup";



const LocationFilter: React.FC = () => {
    const [locationFilter, setLocationFilter] = useState<number | undefined>(undefined)
    const [locationFilterName, setLocationFilterName] = useState<string | undefined>(undefined)
    const [isOpen, setIsOpen] = useState(false)


    const dispatch = useDispatch()
    const {nameFilter, authorFilter, startDateFilter, endDateFilter} = useAppSelector(state => state.paintingsReducer)
    const {currentPage, limit} = useAppSelector(state => state.paginationReducer)
    const {data} = cardsApi.useGetNameFilterQuery({
        name: nameFilter,
        authorId: authorFilter,
        locationId: locationFilter,
        startDate: startDateFilter, endDate: endDateFilter,
        page: currentPage,
        limit: limit
    })

    useEffect(() => {

    //     if (data) {
    //         dispatch(paintingsSlice.actions.filterAction({
    //             paintingsus: data,
    //             author: authorFilter,
    //             name: nameFilter,
    //             location: locationFilter
    //         }))
    //     }
    // }, [data, authorFilter, nameFilter, locationFilter]);

        if (data ) {
            dispatch(paintingsSlice.actions.filterAction({
                paintingsus: data,
                author: authorFilter,
                name: nameFilter,
                location: locationFilter,
                startDate: startDateFilter,
                endDate: endDateFilter
            }))
        }
    }, [data,
        authorFilter,
        nameFilter,
        locationFilter,
        startDateFilter, endDateFilter]);

    const {locations} = useAppSelector(state => state.locationsReducer)
    const {darkMode} = useTheme()

    const handleOptionClick = (locationId: number, locationName: string) => {

        setLocationFilter(locationId);
        setLocationFilterName(locationName);

    }
    // const clearLocationFilter = () => {
    //
    //     setLocationFilter(undefined)
    //     setLocationFilterName(undefined)
    //
    // }

    return (

        <div className={`${classes.container} ${isOpen ? classes.container_open : ''} ${darkMode ? classes.container_dark : ''}`}
             onBlur={() => setIsOpen(false)}
             tabIndex={0}
             onClick={() => setIsOpen(prevState => !prevState)}>

            <span className={classes.name}>{locationFilterName ? locationFilterName : 'Location'}</span>

            {/*<div className={classes.container__buttons}>*/}

            {/*    <button*/}
            {/*        className={`${classes.clear_btn} ${locationFilterName == undefined ? classes.clear_btn__hide : ''}`}*/}
            {/*        onClick={event => {*/}
            {/*            event.stopPropagation()*/}
            {/*            clearLocationFilter()*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        &times;</button>*/}

            {/*    <div className={classes.container__arrow}>*/}
            {/*        <img src={arrow}  className={`${classes.container__arrow_img} ${isOpen ? classes.container__arrow_img_open : ''}`}/>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <ButtonGroup isOpen={isOpen}
                         filterName={locationFilterName}
                         setFilter={() => setLocationFilter(undefined)}
                         setFilterName={() => setLocationFilterName(undefined)}

            />

            <ul className={`${classes.options} ${isOpen ? classes.options_open : ''} ${darkMode ? classes.options_dark : ''}`}>
                {locations?.map((location) =>
                    <li value={location.id} key={location.id} className={`${classes.option}  ${darkMode ? classes.option_dark : ''}`}
                        onClick={() => handleOptionClick(location.id, location.location)}> {location.location} </li>)
                }
            </ul>
        </div>
    );
};

export default LocationFilter;