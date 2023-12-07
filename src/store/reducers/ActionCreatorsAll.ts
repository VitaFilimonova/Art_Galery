import {fetchAuthors, fetchLocations, fetchPaintings} from "./ActionCreators";
import {AppDispatch} from "../store";
import {cardsApi} from "../../services/CardsServise";

export const fetchAllCards = () => async (dispatch: AppDispatch) => {
    try {
        // Вызовите каждую из Thunk-функций последовательно
        await dispatch(fetchPaintings());
        await dispatch(fetchAuthors());
        await dispatch(fetchLocations());

    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};
