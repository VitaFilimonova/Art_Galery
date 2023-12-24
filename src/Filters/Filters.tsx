import React from "react";
import NameFilter from "./NameFilter";
import classes from "./Filters.module.scss";
import DateFilter from "./DateFilter";
import AuthorFilter from "./AuthorFilter";
import LocationFilter from "./LocationFilter";

const Filters: React.FC = () => (
  <div className={classes.filters}>
    <NameFilter />
    <AuthorFilter />
    <LocationFilter />
    <DateFilter />
  </div>
);

export default Filters;
