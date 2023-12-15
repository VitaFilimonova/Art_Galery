import React from 'react';
import {useAppSelector} from "./redux";
import {useDispatch} from "react-redux";
import {toggleTheme} from "../store/reducers/themeSlice";

const UseTheme = () => {

    const {darkMode} = useAppSelector(state => state.themeReducer)
    const dispatch = useDispatch()

    const toggleThemeMode = () => {
        dispatch(toggleTheme());
        document.body.classList.toggle('dark')
    };

    return {
        darkMode,
        toggleThemeMode
    }

};

export default UseTheme;