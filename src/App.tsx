import React, {useEffect} from 'react';
import './App.css';
import './reset.scss';
import Cards from "./Cards/Cards";
import Header from "./Header/Header";
import Filters from "./Filters/Filters";
import {useAppDispatch, useAppSelector} from "./hooks/redux";


import {fetchAllCards} from "./store/reducers/ActionCreatorsAll";
import MyPagination from "./Pagination/MyPagination";
import {cardsApi} from "./services/CardsServise";
import {current} from "@reduxjs/toolkit";
import {setCurrentPage, setTotalPages} from "./store/reducers/paginationSlice";
import nameFilter from "./Filters/NameFilter";


function App() {
    const dispatch = useAppDispatch()
    // const {paintings} = useAppSelector(state => state.paintingsReducer)
    // const {authors} = useAppSelector(state => state.authorsReducer)
    // const {locations} = useAppSelector(state => state.locationsReducer)
// console.log(store.getState())
//     const currentPage = useAppSelector(state => state.paginationReducer.currentPage);
//     const {data } = cardsApi.useGetPaintingsPageQuery({
//         limit: 6, pages: currentPage
//     })
//     dispatch(nameFilter)
//     const {data: paintings} = cardsApi.useGetPaintingsQuery('')
    
    useEffect(() => {
        //i don't know i need to use it or not
        // dispatch(fetchAllCards());

        // dispatch(setCurrentPage(page));
        // dispatch(setTotalPages(totalPages))
    }, []);


//     how many element on per page
const limit = 4


  return (
    <div className="App">

      <header className="App-header">
          <Header/>
      </header>
        <Filters limit = {limit}/>
        <Cards/>
        <MyPagination limit={limit}/>
        <MyPagination limit={limit}/>
    </div>
  );
}

export default App;
