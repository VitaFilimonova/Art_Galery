// import {getPaintingsData} from "../API/CardsServiceAPI";
import React from "react";
import classes from "./Cards.module.scss";
import CardItem from "./CardItem";
import {useAppDispatch, useAppSelector} from "../hooks/redux";


const Cards = () => {

    const {authors} = useAppSelector(state => state.authorsReducer)
    const {locations} = useAppSelector(state => state.locationsReducer)
    const {paintings: cards} = useAppSelector(state => state.paintingsReducer)
    const dispatch = useAppDispatch()

    return (
        <div className={classes.cards}>
            {cards.length === 0? <div className={classes.results}>No results </div> :
                cards?.map((painting) =>
                    <CardItem painting={painting}
                              author={authors && authors.find((author) => author.id === painting.authorId)}
                              location={ locations && locations.find((location) => location.id === painting.locationId)}
                        // date={ locations && locations.find((location) => location.id === painting.locationId)}
                              key={painting.id}/>)
            }
        </div>

    );
}

export default Cards;