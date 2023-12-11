import React, {createContext, SetStateAction, useState} from "react";
import {useDispatch} from "react-redux";

enum ThemeType {
    Light = 1,
    Dark,
}

const dispatch = useDispatch()
type TypeSetState<ThemeType> = dispatch<SetStateAction<ThemeType>>;


interface IThemes {
    currentTheme: ThemeType;
    setCurrentTheme: TypeSetState<ThemeType> | null;
}

const ThemeContext = createContext<IThemes>({currentTheme: ThemeType.Light, setCurrentTheme: null});

// export const ThemeProvider: React.FC<Props> = ({children}) => {
export const ThemeProvider: React.FC = ({children}) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>(ThemeType.Light);

    return (
        <ThemeContext.Provider value={{currentTheme, setCurrentTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}