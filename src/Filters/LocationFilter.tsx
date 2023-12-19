import React, {useEffect, useState} from 'react';
import classes from "./AuthorFilter.module.scss";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../hooks/redux";
import useTheme from "../hooks/useTheme";
import ButtonGroup from "./components/ButtonGroup";
import useVariables from "../hooks/useVariables";
import {paintingsSliceTwo} from "../store/reducers/paintingsSlice1";



const LocationFilter: React.FC = () => {
    const [locationFilter, setLocationFilter] = useState<number | undefined>(undefined)
    const [locationFilterName, setLocationFilterName] = useState<string | undefined>(undefined)
    const [isOpen, setIsOpen] = useState(false)
    const {locations} = useAppSelector(state => state.locationsReducer)
    const dispatch = useDispatch()
    const {darkMode} = useTheme()
    const {data} = useVariables()


    useEffect(() => {
        if (data) {
            dispatch(paintingsSliceTwo.actions.locationFilter({location:  locationFilter}))
            // dispatch(paintingsSliceTwo.actions.filterAction({paintingsus: data}))
        }
    }, [data, locationFilter]);


    const handleOptionClick = (locationId: number, locationName: string) => {
        setLocationFilter(locationId);
        setLocationFilterName(locationName);
    }

    return (

        <div className={`${classes.container} ${isOpen ? classes.container_open : ''} ${darkMode ? classes.container_dark : ''}`}
             onBlur={() => setIsOpen(false)}
             tabIndex={0}
             onClick={() => setIsOpen(prevState => !prevState)}>

            <span className={classes.name}>{locationFilterName ? locationFilterName : 'Location'}</span>

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