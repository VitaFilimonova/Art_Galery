import React from 'react';
import NameFilter from "./NameFilter";
import classes from "./Filters.module.scss";
import DateFilter from "./DateFilter";
import AuthorFilter from "./AuthorFilter";
import LocationFilter from "./LocationFilter";
import {IPages} from "../Pagination/MyPagination";


const Filters :React.FC<IPages> = ({limit}) => {
    return (
        <div className={classes.filters}>
            <NameFilter limit={limit}/>
            <AuthorFilter limit={limit}/>
            <LocationFilter limit={limit}/>
            <DateFilter limit={limit}/>
        </div>
    );
};

export default Filters;