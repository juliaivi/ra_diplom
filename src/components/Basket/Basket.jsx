import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  basketProducts,
  clearbasketProducts,
} from "../../redux/slice/basketListSlice";
import { orderRequest, orderclear } from "../../redux/slice/orderSlice";
import { useNavigate } from "react-router-dom";
import Preloader from "../Main/Preloader/Preloader";

export default function Basket() {
  let { products } = useSelector((state) => state.basketList);
  let { success, loading, error } = useSelector((state) => state.order);
  const navigate = useNavigate();

  const [data, setData] = useState({ phone: "", address: "" });
  const dispatch = useDispatch();
  let sum;

  if (products !== null) {
    sum = products.reduce((sum, item) => sum + item.price * item.amount, 0);
  }

  useEffect(() => {
    const product = getProductBasketStorage();
    dispatch(basketProducts(product));
  }, []);

  const handelDelete = (id) => {
    const product = deleteProductBasketStorage(id);
    dispatch(basketProducts(product));
  };

  const handelChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleRepeat = () => {
    handleSubmit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (products.length === 0) {
      return;
    }

    const order = {
      owner: {
        phone: data.phone,
        address: data.address,
      },
      items: products.map((product) => ({
        id: product.id,
        price: product.price,
        count: product.amount,
      })),
    };
    dispatch(orderRequest(order));
    clearBasketStorage();
  };

  const clearData = () => {
    clearBasketStorage();
    dispatch(clearbasketProducts());
    dispatch(orderclear());
    navigate("/thankyoupage");
  };

  function deleteProductBasketStorage(idSize) {
    let productList = JSON.parse(localStorage.getItem("basket"));
    productList = productList.filter(
      (item) => `${item.id}${item.size}` !== idSize,
    );
    localStorage.setItem("basket", JSON.stringify(productList));
    return productList;
  }

  function getProductBasketStorage() {
    return JSON.parse(localStorage.getItem("basket"));
  }

  function clearBasketStorage() {
    localStorage.setItem("basket", JSON.stringify([]));
  }

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {products.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>
                    <NavLink href="/products/1.html" to={`/catalog/${item.id}`}>
                      {item.title}
                    </NavLink>
                  </td>
                  <td>{item.size}</td>
                  <td>{item.amount}</td>
                  <td>{item.price} руб.</td>
                  <td>{item.amount * item.price} руб.</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handelDelete(`${item.id}${item.size}`)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="5" className="text-right">
                  Общая стоимость
                </td>
                <td>{sum}руб.</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <>
            <div className="empty__cart">Корзина пустая!</div>
          </>
        )}
      </section>
      {products.length > 0 ? (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                  value={data.phone}
                  onChange={handelChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                  value={data.address}
                  onChange={handelChange}
                  required
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreement"
                  required
                />
                <label className="form-check-label" htmlFor="agreement">
                  Согласен с правилами доставки
                </label>
              </div>
              <button type="submit" className="btn btn-outline-secondary">
                Оформить
              </button>
            </form>
          </div>
        </section>
      ) : (
        <></>
      )}

      {loading && <Preloader />}
      {error && (
        <div className="error-msg">
          <p>Произошла ошибка</p>
          <div onClick={handleRepeat}>Повтрорить запрос</div>
        </div>
      )}

      {success && clearData()}
    </>
  );
}
