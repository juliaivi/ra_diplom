import { NavLink, Link } from "react-router-dom";
import { contacts } from "../../data/dataContacts/dataContacts";
import FooterPaySystems from "../generl/footer/Footerpaysystems";

export default function Footer() {
  return (
    <>
      <footer className="container bg-light footer">
        <div className="row">
          <div className="col">
            <section>
              <h5>Информация</h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link">
                    О магазине
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/catalog" className="nav-link">
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contacts" className="nav-link">
                    Контакты
                  </NavLink>
                </li>
              </ul>
            </section>
          </div>
          <div className="col">
            <section>
              <h5>Принимаем к оплате:</h5>
              <div className="footer-pay">
                <FooterPaySystems />
              </div>
            </section>
            <section>
              <div className="footer-copyright">
                2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и
                аксессуаров. Все права защищены.
                <br />
                Доставка по всей России!
              </div>
            </section>
          </div>
          <div className="col text-right">
            <section className="footer-contacts">
              <h5>Контакты:</h5>
              <Link
                className="footer-contacts-phone"
                to={`tel:${contacts.telephone}`}
              >
                {contacts.telephone}
              </Link>
              <span className="footer-contacts-working-hours">
                {contacts.schedule}
              </span>
              <Link
                className="footer-contacts-email"
                to={`mailto:${contacts.email}`}
              >
                {contacts.email}
              </Link>
              <div className="footer-social-links">
                <div className="footer-social-link footer-social-link-twitter"></div>
                <div className="footer-social-link footer-social-link-vk"></div>
              </div>
            </section>
          </div>
        </div>
      </footer>
    </>
  );
}
