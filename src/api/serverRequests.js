const url = "http://localhost:7070/api";
// Хиты продаж
export const getHitList = async () => {
  const response = await fetch(`${url}/top-sales`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
// Категории каталога
export const getCategoriesList = async () => {
  const response = await fetch(`${url}/categories`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
// Элементы каталога для варианта «Все»
export const getAllCatalogItems = async () => {
  const response = await fetch(`${url}/items`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
// другой выбранной категории
export const getNotAllCatalogItems = async (id) => {
  const response = await fetch(`${url}/items?categoryId=${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
// Загрузить ещё
export const getLoadMoreItems = async (id, offset) => {
  const response = await fetch(
    `${url}/items?categoryId=${id}&offset=${offset}`,
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
// поиска
export const searchItems = async (search, categorie) => {
  const params = new URLSearchParams({ q: search });

  const response = await fetch(
    `${url}/items?${params}&categoryId=${categorie}`,
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
// загрузка полной информации о товара
export const getItemInfo = async (id) => {
  const response = await fetch(`${url}/items/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
// оформить заказ
export const sendOrder = async (order) => {
  try {
    const response = await fetch(`${url}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.ok;
  } catch (e) {
    throw new Error(e);
  }
};
