import React, {useEffect, useState} from 'react';
import classes from "./AuthorFilter.module.scss";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../hooks/redux";
import {cardsApi} from "../services/CardsServise";
import {paintingsSlice} from "../store/reducers/paintingsSlice";
import arrow from "../pictures/selectArrow.svg";
import {IPages} from "../Pagination/MyPagination";
const LocationFilter: React.FC<IPages> = ({limit}) => {
    const [locationFilter, setLocationFilter] = useState<number | undefined>(undefined)
    const [locationFilterName, setLocationFilterName] = useState<string | undefined>(undefined)
    const  dispatch = useDispatch()
    const {nameFilter, authorFilter} = useAppSelector(state => state.paintingsReducer)
    const {currentPage} = useAppSelector(state => state.paginationReducer)
    const {data} =  cardsApi.useGetNameFilterQuery({ name:nameFilter, authorId: authorFilter, locationId: locationFilter, page: currentPage})
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {

        if (data) {
            dispatch(paintingsSlice.actions.filterAction({
                paintingsus: data,
                author: authorFilter,
                name: nameFilter,
                location:locationFilter}))
        }
    }, [data, authorFilter, nameFilter, locationFilter]);

    if (data) {
        // dispatch(paintingsSlice.actions.filterAction(data))
        // dispatch(paintingsSlice.actions.filterAuthorAction({paintingsus: data, author: authorFilter}))
    }
    const {locations} = useAppSelector(state => state.locationsReducer)


    const handleOptionClick = (locationId: number, locationName: string) => {

        setLocationFilter(locationId);
        setLocationFilterName(locationName);

    }
    const clearLocationFilter = () => {
        setLocationFilter(undefined)
        setLocationFilterName(undefined)

    }

    return (
            //     <option className={classes.select_opt} >Location</option>
            //     { locations?.map((location) =>
            //         <option value={location.id}  key={location.id}> {location.location} </option>)
            //     }

    <div  className={`${classes.container} ${isOpen ? classes.container__open : ''}`}
          onBlur={()=> setIsOpen(false)}
          tabIndex={0}
          onClick={()=> setIsOpen(prevState => !prevState )}>

        <span className={classes.name}>{locationFilterName? locationFilterName : 'Location'}</span>
        <div className={classes.buttons}>

            <button
                className={`${classes.clear_btn} ${locationFilterName == undefined ? classes.clear_btn__hide : '' }`}
                onClick={event=> {
                    event.stopPropagation()
                    clearLocationFilter()}}
            >
                &times;</button>


            <div className={classes.carette} >
                <img src={arrow} className={`${classes.carette_img} ${isOpen ? classes.carette_img__open : ''}`} />
            </div>
        </div>

        <ul className={`${classes.options} ${isOpen? classes.show : ''}`} >
            {/*<option className={classes.select_opt} selected={true} ></option>*/}
            { locations?.map((location) =>
                <li value={location.id}  key={location.id} className={classes.option} onClick = {() => handleOptionClick(location.id, location.location)} > {location.location} </li>)
            }
        </ul>
    </div>
    );
};

export default LocationFilter;