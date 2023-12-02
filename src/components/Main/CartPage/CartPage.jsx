import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchItem } from "../../../redux/slice/catalogListSlice";
import Preloader from "../Preloader/Preloader";
import Error from "../../Error/Error";

export default function CartPage() {
    const {item, loadingCatalog, errorCatalog} = useSelector(state => state.catalogList);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(1);
    const [selected, setSelect] = useState({selectedSize: false, size: ''});
    const params = useParams(); 
    const navigate = useNavigate();
    let quantity = 0;

    useEffect(() => {
        console.log('CartPage')
        dispatch(searchItem(Number(params.id)))
    }, []);

    function addProductBasketStorage(product) { 
        const productList = JSON.parse(localStorage.getItem('basket'));
        const index = productList.findIndex(item => item.id === product.id && item.size === product.size);
        
        if(localStorage.length === 0) {
            let productList = [];
            productList.push(product);
            localStorage.setItem('basket', JSON.stringify(productList));
            return
        }

        if (index !== -1) {
            productList[index].amount += Number(product.amount)
        } else {
            productList.push(product);
        }

        localStorage.setItem('basket', JSON.stringify(productList));
        return productList;
    }

    const handleChange = (value) => {
        const changeAmount = amount + value;

        if ( changeAmount > 0 && changeAmount <= 10) {
            setAmount(changeAmount);
        }   
    }
 
    const handleSelected = (size) => {
            setSelect(() => ({
                selectedSize: !selected.selectedSize,
                size: !selected.selectedSize ? size : '',
           
            }))
    }

    const handleAddBasket = () => {
        debugger
        if (!selected.size) {
            return;
        }

        const product = {
            title: item.title,
            size: selected.size,
            price: item.price,
            id: item.id,
            amount
        };

        addProductBasketStorage(product);
        navigate('/cart');
    }

    return (
        <>
            {errorCatalog && <Error/>}
            {loadingCatalog ? <Preloader/> : 
                <section className="catalog-item">
                    <h2 className="text-center">{item?.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src={item?.images[0]} className="img-fluid" alt=""/>
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>{item?.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>{item?.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>{item?.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>{item?.material}</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>{item?.season}</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>{item?.reason}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="text-center">
                                <p>Размеры в наличии: 
                                    {item?.sizes.map((el, index) => { 
                                        if(el.available) {
                                            quantity += 1;
                                            return (
                                                <span key={index} className={(selected.size === el.size) ? "catalog-item-size selected": "catalog-item-size"} onClick={()=> handleSelected(el.size)}>{el.size}</span>
                                            )
                                        } 
                                    })}
                                    { quantity === 0 ? <span className="product__out__stock">Товара нет в наличие!</span> : <></> }
                                </p>
                                        
                                { (item?.sizes[0].available === true || item?.sizes[1].available === true) ?                         
                                    <> 
                                        <p>Количество: 
                                            <span className="btn-group btn-group-sm pl-2">
                                                <button className="btn btn-secondary" onClick={() => handleChange(-1)}>-</button>
                                                <span className="btn btn-outline-primary">{amount}</span>
                                                <button className="btn btn-secondary" onClick={() => handleChange(1)}>+</button>
                                            </span>
                                        </p> 
                                        <button className="btn btn-danger btn-block btn-lg" onClick={handleAddBasket}>В корзину</button>
                                    </>
                                : <></>}
                            </div>
                        </div>
                    </div>
                </section>                   
            }
        </>
    )
}