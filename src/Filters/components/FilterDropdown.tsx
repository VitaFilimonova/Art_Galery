import React, { useEffect, useState } from 'react';
import classes from "./../AuthorFilter.module.scss";
import { useDispatch } from "react-redux";
import useTheme from "../../hooks/useTheme";
import useVariables from "../../hooks/useVariables";
import {paintingsSliceTwo} from "../../store/reducers/paintingsSlice1";
import ButtonGroup from "./ButtonGroup";


type FilterKey = 'author' | 'name' | 'location';

interface FilterProps<T> {
    filterData: T[];
    filterKey: FilterKey;
}

const Filter: React.FC<FilterProps<any>> = ({ filterData, filterKey }) => {
    const dispatch = useDispatch();

    const handleOptionClick = (value: any) => {
        const payload: Record<FilterKey, any> = {
            author: undefined,
            name: undefined,
            location: undefined,
        };
        payload[filterKey] = value;
        dispatch(paintingsSliceTwo.actions[`${filterKey}Filter`](payload));
    };

    const [selectedFilter, setSelectedFilter] = useState<number | undefined>(undefined);
    const [selectedFilterName, setSelectedFilterName] = useState<string | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const { darkMode } = useTheme();
    const { data } = useVariables();

    useEffect(() => {
        if (data) {
            dispatch(paintingsSliceTwo.actions.filterAction({ paintingsus: data }));
        }
    }, [data, selectedFilter, filterKey]);

    return (
        <div
            className={`${classes.container} ${isOpen ? classes.container_open : ''} ${darkMode ? classes.container_dark : ''}`}
            onBlur={() => setIsOpen(false)}
            tabIndex={0}
            onClick={() => setIsOpen(prevState => !prevState)}
        >
            <span className={classes.container__name}>{selectedFilterName ? selectedFilterName : 'Filter'}</span>
            <ButtonGroup isOpen={isOpen} filterName={selectedFilterName} setFilter={() => setSelectedFilter(undefined)} setFilterName={() => setSelectedFilterName(undefined)} />
            <ul className={`${classes.options} ${isOpen ? classes.options_open : ''} ${darkMode ? classes.options_dark : ''}`}>
                {filterData?.map((filter) => (
                    <li
                        value={filter.id}
                        key={filter.id}
                        className={`${classes.option} ${darkMode ? classes.option_dark : ''}`}
                        onClick={() => handleOptionClick(filter.id)}
                    >
                        {filter.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filter;