import React, {useEffect, useState} from "react";
import classes from "./NameFilter.module.scss";
import {useDispatch} from "react-redux";
import {paintingsSliceTwo} from "../store/reducers/paintingsSlice1";
import useTheme from "../hooks/useTheme";
import useVariables from "../hooks/useVariables";


const NameFilter: React.FC = () => {
    const [nameFilter, setNameFilter] = useState<string | undefined>(undefined)
    const {darkMode} = useTheme();
    const {data} = useVariables();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(paintingsSliceTwo.actions.nameFilter({name: nameFilter}));
            dispatch(paintingsSliceTwo.actions.filterAction({paintingsus: data}));
        }
    }, [data, nameFilter]);

    return (
        <>
            <input type="text"
                   placeholder="Name"
                   value={nameFilter}
                   onChange={event => setNameFilter(event.target.value)}
                   className={`${classes.container} ${darkMode ? classes.container_dark : ''}`}
            />
        </>
    );
}

export default NameFilter;
