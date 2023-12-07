import React, {FC} from 'react';
import classes from "./Cards.module.scss";
import {IAuthors, ILocations, IPaintings} from "../models/IPaintings";
import {cardsApi} from "../services/CardsServise";

interface CardItemProps {
    painting: IPaintings;
    // name: any;
    author: any;
    location: any;
}

const CardItem: FC<CardItemProps> = ({painting, author, location}) => {
    if (!painting || !author || !location)
    { return <h1>Loading...</h1>}

    return (
        <div className={classes.card}>
            <img src={'https://test-front.framework.team' + `${painting.imageUrl}`} alt='picture'/>
            <div className={classes.card_text}>
                {painting.name}
                <div className={classes.card_text__other}>
                    <div className={classes.card_description} data-label="Author: "> {author.name}</div>
                    <div className={classes.card_description} data-label="Created: ">  {painting.created}</div>
                        <div className={classes.card_description} data-label="Location: "> {location.location}</div>

                </div>
            </div>
        </div>
    );
};

export default CardItem;