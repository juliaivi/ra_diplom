import { NavLink } from "react-router-dom";

export default function Cart(item) {
  return (
    <>
      <div className="col-4" key={item.item.id}>
        <div className="card catalog-item-card">
          <div className="images">
            <img
              src={item.item.images[0]}
              className="card-img-top img-fluid"
              alt={`"${item.item.title}"`}
            />
            {/* <img  style={{backgroundImage: `url(${item.item.images[0]})`, backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                width: '300px', height: "100px"}}
                                className="card-img-top img-fluid" alt={`"${item.item.title}"` width='300px'/> */}
          </div>
          <div className="card-body">
            <p className="card-text">{item.item.title}</p>
            <p className="card-text">{item.item.price}</p>
            <NavLink
              to={`/catalog/${item.item.id}`}
              className="btn btn-outline-primary"
            >
              Заказать
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
