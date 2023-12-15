import {fetchAuthors, fetchLocations, fetchPaintings} from "./ActionCreators";
import {AppDispatch} from "../store";

export const fetchAllCards = () => async (dispatch: AppDispatch) => {
    try {
        await dispatch(fetchAuthors());
        await dispatch(fetchLocations());
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};
