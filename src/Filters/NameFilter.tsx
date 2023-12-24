import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./NameFilter.module.scss";
import { paintingsSlice } from "../store/reducers/paintingsSlice";
import useTheme from "../hooks/useTheme";
import useVariables from "../hooks/useVariables";

const NameFilter: React.FC = () => {
  const [nameFilter, setNameFilter] = useState<string | undefined>(undefined);
  const { darkMode } = useTheme();
  const { data } = useVariables();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(paintingsSlice.actions.nameFilter({ name: nameFilter }));
      dispatch(paintingsSlice.actions.filterAction({ paintings: data }));
    }
  }, [data, nameFilter]);

  return (
    <input
      type="text"
      placeholder="Name"
      value={nameFilter}
      onChange={(event) => setNameFilter(event.target.value)}
      className={`${classes.container} ${
        darkMode ? classes.container_dark : ""
      }`}
    />
  );
};

export default NameFilter;
