import logo from '../../img/header-logo.png';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, {useState} from "react";
import { searchItemsCatalog } from "../../redux/slice/catalogListSlice";

export default function Header () {
   const [valueSearch, setValueSearch] = useState('');
    const {products} = useSelector(state => state.basketList);
    const {categorieActive} = useSelector(state => state.categoriesList); 
    const [visible, setVisible] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSearch =  (e) => {
        e.preventDefault();
        dispatch(searchItemsCatalog({payload: valueSearch, categorieActive}));
        setVisible(!visible);
        setValueSearch('');
        navigate('./catalog');
    }

    const handleChange = (e) => {
        const {value} = e.target;
        setValueSearch(value);
    }
    
    return (
    <>
        <header className="container">
            <div className="row">
                <div className="col">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt="Bosa Noga" />
                    </NavLink>
                    <div className="collapse navbar-collapse" id="navbarMain">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Главная</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="catalog">Каталог</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="about">О магазине</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="contacts">Контакты</NavLink>
                        </li>
                    </ul>
                    <div className='control__elements'>
                        <div className="header-controls-pics">
                        <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={() => setVisible(!visible)}></div>
                        <div className="header-controls-pic header-controls-cart" onClick={() => navigate('/cart')}>
                           {!!products.length && <div className="header-controls-cart-full">{products.length}</div>} 
                            <div className="header-controls-cart-menu"></div>
                        </div>
                        </div>
                        <form data-id="search-form" className={`header-controls-search-form form-inline ${visible && "invisible"}`} onSubmit={handleSearch}>
                            <input className="form-control" placeholder="Поиск" onChange={handleChange} value={valueSearch}/>
                        </form>
                    </div>
                    </div>
                </nav>
                </div>
            </div>
        </header>
    </>
    )
}
