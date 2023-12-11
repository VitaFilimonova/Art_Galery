import React, {useEffect, useState} from "react";
import classes from "./NameFilter.module.scss";
import {cardsApi} from "../services/CardsServise";
import {useDispatch} from "react-redux";
import {paintingsSlice} from "../store/reducers/paintingsSlice";
import {useAppSelector} from "../hooks/redux";


const NameFilter: React.FC = () => {
    const [nameFilter, setNameFilter] = useState<string | undefined>(undefined)
    const dispatch = useDispatch()
    const {authorFilter, locationFilter} = useAppSelector(state => state.paintingsReducer)
    const {currentPage, limit} = useAppSelector(state => state.paginationReducer)
    const {data} = cardsApi.useGetNameFilterQuery({name: nameFilter, authorId: authorFilter, locationId: locationFilter, page: currentPage, limit: limit})


    useEffect(() => {

        if (data) {
            dispatch(paintingsSlice.actions.filterAction({
                paintingsus: data,
                author: authorFilter,
                location: locationFilter,
                name: nameFilter,
            }))

console.log(nameFilter)
        }

    }, [data, authorFilter, nameFilter, locationFilter]);
    return (
        <div>

            <input type="text"
                   placeholder="Name"
                   value={nameFilter}
                   onChange={event => setNameFilter(event.target.value)}
                   className={classes.input}
            />
            <div className="paintings">
            </div>
        </div>
    );
}

export default NameFilter;
