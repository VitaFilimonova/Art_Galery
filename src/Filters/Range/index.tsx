import { FC, useRef, useState } from 'react';


import classes from './Range.module.scss';
import useOutsideClick from '../../hooks/useOutsideClick';


export interface IRange {

  className?: string;

  isDarkTheme: boolean;

  onClose: () => void;
  children: any
}

const Range: FC<IRange> = ({ children, isDarkTheme, className, onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const hideMenu = () => {
    setIsOpen(false);
    onClose();
  };

  useOutsideClick(ref, hideMenu);

  return (
    <div
      ref={ref}
      className={classes.Range
        // 'Range--open': isOpen,
        // 'Range--dark': isDarkTheme
      }
      aria-hidden="true"
      onClick={isOpen ? hideMenu : openMenu}>
      <span className={classes.Range__title}>Choose values</span>
      {/*<Arrow className={classes.Range__arrow} isOpen={isOpen} isDarkTheme={isDarkTheme} />*/}
      {isOpen && (
        <div
          className={classes.Range__сontainer}
          onClick={(e) => e.stopPropagation()}
          aria-hidden="true">
          {children}
        </div>
      )}
    </div>
  );
};

export default Range;
