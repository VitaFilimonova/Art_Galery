import React from 'react';
import classes from "../DateFilter.module.scss";

interface InputProps {
    id: string;
    placeholder: string;
    value: string | undefined;
    dataSet:  () => void;
}
const Input: React.FC<InputProps> = ({id, placeholder, value, dataSet}) => {
    return (
        <>
            <input id={id}
                   placeholder={placeholder}
                   className={classes.input}
                   value={value}
                   onClick={(event) => event.stopPropagation()}
                   // onChange={(event) => dataSet(event.target.value)}
            >
            </input>
        </>
    );
};

export default Input;