import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./redux";
import { toggleTheme } from "../store/reducers/themeSlice";

const UseTheme = () => {
  const darkMode = useAppSelector((state) => state.themeReducer.darkMode);
  const dispatch = useDispatch();

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    darkMode
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [darkMode]);

  return {
    darkMode,
    toggleThemeMode,
  };
};

export default UseTheme;
