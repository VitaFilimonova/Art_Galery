import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./AuthorFilter.module.scss";
import { useAppSelector } from "../hooks/redux";
import useTheme from "../hooks/useTheme";
import ButtonGroup from "./components/ButtonGroup";
import useVariables from "../hooks/useVariables";
import { paintingsSlice } from "../store/reducers/paintingsSlice";

const LocationFilter: React.FC = () => {
  const [locationFilter, setLocationFilter] = useState<number | undefined>(
    undefined,
  );
  const [locationFilterName, setLocationFilterName] = useState<
    string | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const { locations } = useAppSelector((state) => state.locationsReducer);
  const dispatch = useDispatch();
  const { darkMode } = useTheme();
  const { data } = useVariables();

  useEffect(() => {
    if (data) {
      dispatch(
        paintingsSlice.actions.locationFilter({ location: locationFilter }),
      );
      dispatch(paintingsSlice.actions.filterAction({ paintings: data }));
    }
  }, [data, locationFilter]);

  const handleOptionClick = (locationId: number, locationName: string) => {
    setLocationFilter(locationId);
    setLocationFilterName(locationName);
  };

  return (
    <div
      className={`${classes.container} ${
        isOpen ? classes.container_open : ""
      } ${darkMode ? classes.container_dark : ""}`}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prevState) => !prevState)}
      tabIndex={0}
      role="button"
    >
      <span className={classes.name}>{locationFilterName || "Location"}</span>

      <ButtonGroup
        isOpen={isOpen}
        filterName={locationFilterName}
        setFilter={() => setLocationFilter(undefined)}
        setFilterName={() => setLocationFilterName(undefined)}
      />

      <ul
        className={`${classes.options} ${isOpen ? classes.options_open : ""} ${
          darkMode ? classes.options_dark : ""
        }`}
      >
        {locations?.map((location) => (
          <li
            value={location.id}
            key={location.id}
            className={`${classes.option}  ${
              darkMode ? classes.option_dark : ""
            }`}
            onClick={() => handleOptionClick(location.id, location.location)}
            role="presentation"
          >
            {location.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationFilter;
