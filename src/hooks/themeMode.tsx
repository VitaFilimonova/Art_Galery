import {createContext, SetStateAction, useState} from "react";
import {Dispatch} from "@reduxjs/toolkit";
import {useAppDispatch} from "./redux";
// const ThemeContext = createContext()

// type TypeSetState<T> = useDispat



// enum ThemeType {
    // Light = 1,
    // Dark,
// }

// type TypeSetState<T> = useAppDispatch<SetStateAction<ThemeType>>;

// type Props = {
    // children: React.ReactNode;
// };

// interface IContext {
    // type: ThemeType;
    // setType: TypeSetState<ThemeType> | null;
// }

// const ThemeContext = createContext<IContext>({type: ThemeType.Light, setType: null});

// export const ThemeProvider: React.FC<Props> = ({children}) => {
//     const [type, setType] = useState<ThemeType>(ThemeType.Light);

    // return <ThemeContext.Provider value={{type, setType}}>{children}</ThemeContext.Provider>;