import React, {useEffect} from 'react';
import classes from "./Input.module.scss";
import useTheme from "../../hooks/useTheme";

interface InputProps {
    id: string;
    placeholder: string;
    value: string | undefined;
    dateSetFilter: (date: string | undefined) => void;
    setErrorFilter: (error: boolean) => void;
}

const Input: React.FC<InputProps> = ({id, placeholder, value, dateSetFilter, setErrorFilter}) => {
    const {darkMode} = useTheme()
    const dateSet = (date: string | undefined) => {
        if (date && date.length === 4 && !isNaN(Number(date))) {
            dateSetFilter(date)
            setErrorFilter(false)
        } else if (date?.length === 0) {
            setErrorFilter(false)
        } else {
            dateSetFilter(undefined)
            setErrorFilter(true)
        }
    }
    useEffect(() => {
        if (value) {
            dateSet(value);
        }
    }, [value, dateSet]);

    return (
        <>
            <input id={id}
                   placeholder={placeholder}
                   className={`${classes.input} ${darkMode ? classes.input_dark : ''}`}
                   value={value}
                   onClick={(event) => event.stopPropagation()}
                   onChange={(event) => dateSet(event.target.value)}
            >
            </input>
        </>
    );
};

export default Input;