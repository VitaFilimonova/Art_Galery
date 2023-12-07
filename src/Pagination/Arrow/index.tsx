import { FC } from 'react';
import  SelectArrow  from './../../images/selectArrow.svg';
import  classes from './Arrow.module.scss';

export type TArrow = {
  isOpen: boolean;
  isDarkTheme: boolean;
  className?: string;
};

const Arrow: FC<TArrow> = ({ isOpen, isDarkTheme, className }) => (
  <div
    className={classes.Arrow}>
    <SelectArrow />
  </div>
);

export default Arrow;
