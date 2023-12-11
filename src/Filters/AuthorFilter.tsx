import React, {useEffect, useState} from 'react';
import classes from "./AuthorFilter.module.scss";
import {useDispatch} from "react-redux";
import {cardsApi} from "../services/CardsServise";
import {paintingsSlice} from "../store/reducers/paintingsSlice";
import {useAppSelector} from "../hooks/redux";
import arrow from "./../pictures/selectArrow.svg";

const AuthorFilter: React.FC = () => {
    const [authorFilter, setAuthorFilter] = useState<number | undefined>(undefined)
    const [authorFilterName, setAuthorFilterName] = useState<string | undefined>(undefined)
    const  dispatch = useDispatch()
    const {nameFilter, locationFilter} = useAppSelector(state => state.paintingsReducer)
    const {currentPage, limit} = useAppSelector(state => state.paginationReducer)
    const {data} =  cardsApi.useGetNameFilterQuery({ name:nameFilter, authorId: authorFilter, locationId: locationFilter, page: currentPage, limit: limit})
    const {authors} = useAppSelector(state => state.authorsReducer)
    useEffect(() => {

        if (data) {
            dispatch(paintingsSlice.actions.filterAction({
                paintingsus: data,
                name: nameFilter,
                location: locationFilter,
                author: authorFilter,
            }))

        }
    }, [data, authorFilter, nameFilter, locationFilter ]);



   const [isOpen, setIsOpen] = useState(false)
    const handleOptionClick = (authorId: number, authorName: string) => {

        setAuthorFilter(authorId);
        setAuthorFilterName(authorName);

    }

    const clearAuthorFilter = () => {
        setAuthorFilter(undefined)
        setAuthorFilterName(undefined)
    }

    return (
        <div  className={`${classes.container} ${isOpen ? classes.container__open : ''}`}
onBlur={()=> setIsOpen(false)}
             tabIndex={0}
             onClick={()=> setIsOpen(prevState => !prevState )}>

            <span className={classes.name}>{authorFilterName? authorFilterName : 'Author'}</span>
            <div className={classes.buttons}>

                    <button
                        className={`${classes.clear_btn} ${authorFilterName == undefined ? classes.clear_btn__hide : '' }`}
                        onClick={event=> {
                            event.stopPropagation()
                            clearAuthorFilter()}}
                    >
                        &times;</button>


                <div className={classes.carette} >
                    <img src={arrow} className={`${classes.carette_img} ${isOpen ? classes.carette_img__open : ''}`} />
                </div>
            </div>

            <ul className={`${classes.options} ${isOpen? classes.show : ''}`} >
                { authors?.map((author) =>
                    <li value={author.id}  key={author.id} className={classes.option} onClick = {() => handleOptionClick(author.id, author.name)} > {author.name} </li>)
                }
            </ul>

        </div>
    );
};

export default AuthorFilter;















































// const AuthorFilter = () => {
//     const [authorFilter, setAuthorFilter] = useState<number | undefined>(undefined)
//     const  dispatch = useDispatch()
// const {nameFilter, locationFilter} = useAppSelector(state => state.paintingsReducer)
//     const {data} =  cardsApi.useGetNameFilterQuery({ name:nameFilter, authorId: authorFilter, locationId: locationFilter})
//
//     // };
// // if() {
// //
// // }
//
//     useEffect(() => {
//
//         if (data) {
//             // authorFilter?
//             dispatch(paintingsSlice.actions.filterAction({ author: authorFilter, name: nameFilter, location: locationFilter}))
//             // dispatch(paintingsSlice.actions.filterAction({paintingsus: data, author: authorFilter, name: nameFilter, location: locationFilter}))
//         // : dispatch(paintingsSlice.actions.filterAction({paintingsus: data, name: nameFilter, location: locationFilter}))
//         console.log('authorFil')
//         }
//     }, [data, authorFilter, nameFilter, locationFilter]);
//
//     if (data) {
//         // dispatch(paintingsSlice.actions.filterAction(data))
//         // dispatch(paintingsSlice.actions.filterAuthorAction({paintingsus: data, author: authorFilter}))
//     }
//     const {authors, selectedAuthor} = useAppSelector(state => state.authorsReducer)
//     // const {paintings} = useAppSelector(state => state.paintingsReducer)
//
//     // dispatch(authorsSlice.actions.authorFilter(authorFilter))
//     // console.log(nameFilter, data)
//     return (
//         <div className={classes.select}>
//
//             <select onChange={event => setAuthorFilter(+event.target.value)} >
//                 <option className={classes.select_opt} selected={true} placeholder={'Author'}></option>
//                 { authors?.map((author) =>
//                     <option value={author.id}  key={author.id}> {author.name} </option>)
//                    }
//             </select>
//
//             {/*<div className={classes.select}>*/}
//             {/*    <div className={classes.select__active}>*/}
//             {/*        <div className={classes.select__header}>*/}
//             {/*            <span className={classes.select__current}>Value 1</span>*/}
//             {/*            <div className={classes.select__item}>&times;</div>*/}
//             {/*        </div>*/}
//
//             {/*        <div className={classes.select__body}>*/}
//             {/*            <div className={classes.select__item}>Value 1</div>*/}
//             {/*            <div className={classes.select__item}>Value 2</div>*/}
//             {/*            <div className={classes.select__item}>Value 3</div>*/}
//             {/*        </div>*/}
//             {/*    </div>*/}
//             {/*</div>*/}
//
//             {/*<div>*/}
//             {/*    <i></i>*/}
//             {/*</div>*/}
//
//         </div>
//     );
// };
//
// export default AuthorFilter;