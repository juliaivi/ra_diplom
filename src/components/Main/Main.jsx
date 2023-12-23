import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { catalogListRequest } from "../../redux/slice/catalogListSlice";
import { hitListRequest } from "../../redux/slice/hitListSlice";
import Preloader from "./Preloader/Preloader";
import Cart from "./Cart/Cart";
import Catalog from "./Catalog/Catalog";

export default function Main() {
  const { loading, items } = useSelector((state) => state.hitList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hitListRequest());
    dispatch(catalogListRequest());
  }, []);

  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {loading ? (
          <Preloader />
        ) : (
          <div className="row">
            {items.map((item) => (
              <Cart item={item} key={item.id} />
            ))}
          </div>
        )}
      </section>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Catalog />
      </section>
    </>
  );
}
