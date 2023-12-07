import React, { FC } from 'react';
import PaginationPage, {PaginationPageProps} from "./Pagination";
import classes from "./Pagination.module.scss";


interface IProps extends PaginationPageProps {
  isActive: boolean;
}

const PaginationPageWithActive: FC<IProps> = ({ isDarkTheme, isActive, className, ...other }) => (
  <PaginationPage
    isDarkTheme={isDarkTheme}
    className={classes.PaginationPageWithActive}
    {...other}
  />
);

export default PaginationPageWithActive;
