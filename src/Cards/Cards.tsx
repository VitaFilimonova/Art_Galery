// import {getPaintingsData} from "../API/CardsServiceAPI";
import React, {useEffect} from "react";
import classes from "./Cards.module.scss";
import {cardsApi} from "../services/CardsServise";
import CardItem from "./CardItem";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

import {useDispatch} from "react-redux";
import {fetchPaintings} from "../store/reducers/ActionCreators";
import {fetchAllCards} from "../store/reducers/ActionCreatorsAll";
import {retry} from "@reduxjs/toolkit/query";

const Cards = () => {

    // const {data: paintings} = cardsApi.useGetPaintingsQuery('')
    const {data: authors} = cardsApi.useGetAuthorsQuery('')
    const {data: locations} = cardsApi.useGetLocationsQuery('')
// const data = useAppSelector(state => state.paintingsReducer)
    const {paintings: ha} = useAppSelector(state => state.paintingsReducer)
    const dispatch = useAppDispatch()



// const isFilter = ha
//     console.log(isFilter)
// const filteredCards = (isFilter.length!==0)
//     ? ha?.map((painting) =>
//         <CardItem painting={painting}
//                   author={authors && authors.find((author) => author.id === painting.authorId)}
//                   location={ locations && locations.find((location) => location.id === painting.locationId)}
//                   key={painting.id}/>)
//     : ''
    // paintings?.map((painting) =>
       // <CardItem painting={painting}
       //           author={authors && authors.find((author) => author.id === painting.authorId)}
       //          location={ locations && locations.find((location) => location.id === painting.locationId)}
       //           key={painting.id}/>)
    return (
        <div className={classes.cards}>
            {/*{filteredCards}*/}
            {/*{error && <h1>Error</h1>}*/}
            {/*{ha?.map((painting) =>*/}
            {/*    <CardItem painting={painting}*/}
            {/*              author={authors && authors.find((author) => author.id === painting.authorId)}*/}
            {/*              location={ locations && locations.find((location) => location.id === painting.locationId)}*/}
            {/*              key={painting.id}/>)}*/}
            {ha.length === 0? <div className={classes.results}>No results </div> :
                ha?.map((painting) =>
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