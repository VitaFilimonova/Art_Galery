
import React, {useEffect, useState} from "react";
import classes from "./NameFilter.module.scss";
import {cardsApi} from "../services/CardsServise";
import {useDispatch} from "react-redux";
import {paintingsSlice} from "../store/reducers/paintingsSlice";
import {store} from "../store/store";
import {useAppSelector} from "../hooks/redux";
import {IPages} from "../Pagination/MyPagination";

const NameFilter: React.FC<IPages> =({limit}) => {
    const [nameFilter, setNameFilter] = useState<string>('')
    const  dispatch = useDispatch()
    const {authorFilter, locationFilter} = useAppSelector(state => state.paintingsReducer)
    const {currentPage} = useAppSelector(state => state.paginationReducer)
    const {data} =  cardsApi.useGetNameFilterQuery({name:nameFilter, authorId: authorFilter, locationId: locationFilter, page: currentPage})


    useEffect(() => {
        if (data && nameFilter != '') {
            // authorFilter ?
            dispatch(paintingsSlice.actions.filterAction( {
                paintingsus: data,
                author: authorFilter,
                location: locationFilter,
                name: nameFilter

            }))
       // :  dispatch(paintingsSlice.actions.filterAction( {paintingsus: data}))
        }
        console.log('nameFil')
    }, [data, authorFilter, nameFilter, locationFilter]);
    return (
        <div >

            <input type="text"
                   placeholder = "Name"
                   value={nameFilter}
                   onChange={event=> setNameFilter(event.target.value) }
                   className={classes.input}
            />
            <div className="paintings">
            </div>
        </div>
    );
}

export default NameFilter;





//     const [nameFilter, setNameFilter] = useState('');
// const names = useAppSelector(state =>{return state.paintingsReducer.paintings} )
// const filteredPaintings = names.filter((painting) =>
//     painting.name.toLowerCase().includes(nameFilter.toLowerCase())
// );

// const dispatch = useAppDispatch();
// const useHandleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// const nameFilterValue = event.target.value;
// dispatch(setNameFilter(nameFilterValue)); // Обновляем значение фильтра по имени в Redux

// const {data} = useGetNameFilterQuery(event.target.value)
// const jaja = useTypedSelector()
// };