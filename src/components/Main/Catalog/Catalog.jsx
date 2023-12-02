import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import Cart from "../Cart/Cart";
import { getMore } from "../../../redux/slice/catalogListSlice";
import {categoriesListRequest, categoriesChange } from "../../../redux/slice/categoriesListSlice";
import Error from "../../Error/Error";
import { Link } from "react-router-dom";

export default function Catalog() {
    let {itemCategories, categorieActive, loadingCategories, errorCategories} = useSelector(state => state.categoriesList)
    let { itemCatalog, loadingCatalog, errorCatalog, itemLength,  offset} = useSelector(state => state.catalogList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(categoriesListRequest());
    }, [dispatch]); 

    const hendleGetMoreList = () => {
        offset +=6; 
        dispatch(getMore({categorieActive, offset}))
    }
    const handleChange = (e, id) => {
        e.preventDefault();
        offset = 0;
        dispatch(categoriesChange(id));
    }

    return (
        <>
            {errorCategories || errorCatalog && <Error />}        
            {loadingCategories ? <Preloader /> : <ul className="catalog-categories nav justify-content-center">
                    {itemCategories.map((categorie) => {
                         return (
                            <li className="nav-item" key={categorie.id}>
                                  <Link className={categorie.id === categorieActive ? 'nav-link active': 'nav-link'} to="#" onClick={(e) => handleChange(e, categorie.id)}>{categorie.title}</Link>
                            </li> 
                        )
                    })}
                </ul>
            }

            {loadingCatalog ? <Preloader /> : <div className='row'>
                {itemCatalog.map(item => (
                    <Cart item={item} key={item.id}  />
                ))}
                
                </div>
            }
            {itemLength > 5 && <div className="text-center">
                <button className="btn btn-outline-primary" onClick={hendleGetMoreList} disabled={loadingCatalog}>Загрузить еще</button>
            </div>}   
        </>
    )
}