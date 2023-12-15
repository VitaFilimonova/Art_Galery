import React from "react";
import classes from "./Cards.module.scss";
import CardItem from "./CardItem";
import { useAppSelector} from "../hooks/redux";
import useTheme from "../hooks/useTheme";


const Cards = () => {

    const {authors} = useAppSelector(state => state.authorsReducer)
    const {locations} = useAppSelector(state => state.locationsReducer)
    const {paintings: cards} = useAppSelector(state => state.paintingsReducer)
    const { darkMode } = useTheme();

    return (
        <div className={classes.cards}>
            {cards.length === 0 ? <div className={`${classes.cards__results} ${darkMode? classes.cards__results_dark : '' }`}>No results </div> :
                cards?.map((painting) =>
                    <CardItem painting={painting}
                              author={authors && authors.find((author) => author.id === painting.authorId)}
                              location={locations && locations.find((location) => location.id === painting.locationId)}
                              key={painting.id}/>)
            }
        </div>

    );
}

export default Cards;