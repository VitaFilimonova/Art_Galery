import React from "react";
import classes from "./ButtonGroup.module.scss";
import arrowLight from "../../pictures/arrowSelect_light.svg";
import arrowDark from "../../pictures/arrowSelect_dark.svg";
import useTheme from "../../hooks/useTheme";

interface ButtonGroupProps {
  setFilter?: () => void;
  setFilterName?: () => void;
  filterName?: string | undefined;
  isOpen: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  setFilter,
  setFilterName,
  filterName,
  isOpen,
}) => {
  const clearFilter = () => {
    if (setFilter && setFilterName) {
      setFilter();
      setFilterName();
    }
  };

  const { darkMode } = useTheme();
  return (
    <div className={classes.buttons}>
      {setFilter && setFilterName && (
        <button
          type="button"
          className={`${classes.button__clear} ${
            filterName === undefined ? classes.button__clear_hide : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();
            clearFilter();
          }}
        >
          &times;
        </button>
      )}

      <div className={classes.arrow}>
        <img
          src={darkMode ? arrowDark : arrowLight}
          className={`${classes.arrow__img} ${
            isOpen ? classes.arrow__img_open : ""
          }`}
          alt="Arrow"
        />
      </div>
    </div>
  );
};

export default ButtonGroup;
