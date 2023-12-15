import React from 'react';
import logo from './../pictures/logo.svg'
import themeDark from '../pictures/theme_dark.svg'
import themeLight from '../pictures/theme_light.svg'
import classes from "./Header.module.scss";

import useTheme from "../hooks/useTheme";
const Header:React.FC = () => {
    const { darkMode, toggleThemeMode } = useTheme();

    return (
        <div className={classes.header}>
            <img src={logo} className={classes.logo} alt='logo'/>
            <button  onClick={toggleThemeMode} className={classes.theme}>
                <img src={darkMode? themeDark : themeLight } className={classes.theme__img} alt='choose_theme'/>
            </button>
        </div>
    );
};

export default Header;