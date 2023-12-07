import React from 'react';
import logo from './../pictures/logo.svg'
import theme from './../pictures/theme_dark.svg'
import classes from "./Header.module.scss";
const Header = () => {
    return (
        <div className={classes.header}>
            <img src={logo} className={classes.logo} alt='logo'/>
            <button className={classes.theme}>
                <img src={theme} className={classes.theme__img} alt='theme'/>
            </button>
        </div>
    );
};

export default Header;