import { useSelector, useDispatch } from "react-redux";
import { searchItemsCatalog } from "../../../redux/slice/catalogListSlice";
import React, { useEffect, useState } from "react";
import Catalog from "../Catalog/Catalog";

export default function CatalogPage() {
  const { search } = useSelector((state) => state.catalogList);
  const { categorieActive } = useSelector((state) => state.categoriesList);
  const dispatch = useDispatch();
  const [valueSearch, setValue] = useState(search);

  useEffect(() => {
    dispatch(searchItemsCatalog({ payload: valueSearch, categorieActive }));
  }, [valueSearch]);

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchItemsCatalog({ payload: valueSearch, categorieActive }));
  };

  return (
    <>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <form
          className="catalog-search-form form-inline"
          onSubmit={handleSearch}
        >
          <input
            className="form-control"
            value={valueSearch}
            onChange={handleChange}
            placeholder="Поиск"
          />
        </form>
        <Catalog />
      </section>
    </>
  );
}
