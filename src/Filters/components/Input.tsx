import React from 'react';
import classes from "../DateFilter.module.scss";

interface InputProps {
    id: string;
    placeholder: string;
    value: string | undefined;
    dateSetFilter:  (date: string | undefined) => void;
    setErrorFilter: (error: boolean) => void;
}
const Input: React.FC<InputProps> = ({id, placeholder, value, dateSetFilter, setErrorFilter}) => {

    const dateSet = (date: string | undefined) => {
        if (date && date.length === 4 && !isNaN(Number(date))) {
            dateSetFilter(date)
            setErrorFilter(false)
        }
        else if (date?.length === 0) {
            setErrorFilter(false)
        }

        else {
            dateSetFilter(undefined)
            setErrorFilter(true)
        }
    }

    return (
        <>
            <input id={id}
                   placeholder={placeholder}
                   className={classes.input}
                   value={value}
                   onClick={(event) => event.stopPropagation()}
                   onChange={(event) => dateSet(event.target.value)}
            >
            </input>
        </>
    );
};

export default Input;