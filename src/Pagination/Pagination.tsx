// import React from 'react';
// import classes from "./Pagination.module.scss";
// import double_arrow from './../pictures/double_arrow.svg'
// const Pagination = () => {
//     return (
//         <div>
//             <div>
//                 <button className={classes.arrow}>
//                     <img src={double_arrow} className={classes.arrow__img} alt='arrow'/>
//                 </button>
//
//             </div>
//         </div>
//     );
// };
//
// export default Pagination;
import { FC, ButtonHTMLAttributes } from 'react';
import classes from './Pagination.module.scss';

export interface PaginationPageProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isDarkTheme: boolean;
}

const PaginationPage: FC<PaginationPageProps> = ({ isDarkTheme, className }) => (
    <button
        type="button"
        className={classes.PaginationPage}
    />
);

export default PaginationPage;