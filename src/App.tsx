import React, {useEffect} from 'react';
import './App.scss';
import './reset.scss';
import Cards from "./Cards/Cards";
import Header from "./Header/Header";
import Filters from "./Filters/Filters";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {fetchAllCards} from "./store/reducers/ActionCreatorsAll";
import Pagination from "./Pagination/Pagination";


function App() {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAllCards());
    }, []);

    return (
        <div className={'App'}>
            <Header/>
            <Filters/>
            <Cards/>
            <Pagination/>
        </div>
    );
}

export default App;
