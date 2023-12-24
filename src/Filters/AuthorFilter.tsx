import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./AuthorFilter.module.scss";
import { useAppSelector } from "../hooks/redux";
import useTheme from "../hooks/useTheme";
import ButtonGroup from "./components/ButtonGroup";
import useVariables from "../hooks/useVariables";
import { paintingsSlice } from "../store/reducers/paintingsSlice";

const AuthorFilter: React.FC = () => {
  const [authorFilter, setAuthorFilter] = useState<number | undefined>(
    undefined,
  );
  const [authorFilterName, setAuthorFilterName] = useState<string | undefined>(
    undefined,
  );
  const [isOpen, setIsOpen] = useState(false);
  const { authors } = useAppSelector((state) => state.authorsReducer);
  const dispatch = useDispatch();
  const { darkMode } = useTheme();
  const { data } = useVariables();

  const handleOptionClick = (authorId: number, authorName: string) => {
    setAuthorFilter(authorId);
    setAuthorFilterName(authorName);
  };

  useEffect(() => {
    if (data) {
      dispatch(paintingsSlice.actions.authorFilter({ author: authorFilter }));
      dispatch(paintingsSlice.actions.filterAction({ paintings: data }));
    }
  }, [data, authorFilter]);
  return (
    <div
      className={`${classes.container} ${
        isOpen ? classes.container_open : ""
      } ${darkMode ? classes.container_dark : ""}`}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prevState) => !prevState)}
      tabIndex={0}
      role="button"
    >
      <span className={classes.container__name}>
        {authorFilterName || "Author"}
      </span>

      <ButtonGroup
        isOpen={isOpen}
        filterName={authorFilterName}
        setFilter={() => setAuthorFilter(undefined)}
        setFilterName={() => setAuthorFilterName(undefined)}
      />

      <ul
        className={`${classes.options} ${isOpen ? classes.options_open : ""} ${
          darkMode ? classes.options_dark : ""
        }`}
      >
        {authors?.map((author) => (
          <li
            value={author.id}
            key={author.id}
            className={`${classes.option}  ${
              darkMode ? classes.option_dark : ""
            }`}
            onClick={() => handleOptionClick(author.id, author.name)}
            role="presentation"
          >
            {author.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorFilter;
