import React, {useState} from 'react';
import ButtonGroup from './ButtonGroup';
import {useAppSelector} from '../../hooks/redux';
import classes from './../AuthorFilter.module.scss';
interface FilterDropdownProps {
    filterType: string;
    filterItems: Array<{ id: number; name: string }>;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ filterType, filterItems,}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState<number | undefined>(undefined)
    const [filterName, setFilterName] = useState<string | undefined>(undefined)

    const {darkMode} = useAppSelector(state => state.themeReducer);

    const handleOptionClick = (id: number, name: string) => {
        setFilter(id);
        setFilterName(name);
    };

    const clearFilter = () => {
        setFilter(undefined);
        setFilterName(undefined);
    };







    return (
        <div
            className={`${classes.container} ${isOpen ? classes.container_open : ''} 
            ${darkMode ? classes.container_dark : ''}`}
            onBlur={() => setIsOpen(false)}
            tabIndex={0}
            onClick={() => setIsOpen(prevState => !prevState)}
        >
            <span className={classes.name}>{filterName ? filterName : filterType}</span>

            <ButtonGroup
                // clearFilter={clearFilter}
                isOpen={isOpen}
                filterName={filterName}
            />

            <ul
                className={`${classes.options} ${isOpen ? classes.options_open : ''} ${
                    darkMode ? classes.options_dark : ''}`}>

                {filterItems?.map(item => (
                    <li
                        key={item.id}
                        className={`${classes.option} ${darkMode ? classes.option_dark : ''}`}
                        onClick={() => handleOptionClick(item.id, item.name)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterDropdown;