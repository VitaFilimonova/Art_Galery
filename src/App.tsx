import React, {useEffect} from 'react';
import './App.css';
import './reset.scss';
import Cards from "./Cards/Cards";
import Header from "./Header/Header";
import Filters from "./Filters/Filters";
import {useAppDispatch} from "./hooks/redux";
import {fetchAllCards} from "./store/reducers/ActionCreatorsAll";
import MyPagination from "./Pagination/MyPagination";


function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAllCards());
    }, []);


  return (
    <div className="App">
      <header className="App-header">
          <Header/>
      </header>
        <Filters />
        <Cards/>
        <MyPagination />
    </div>
  );
}

export default App;
