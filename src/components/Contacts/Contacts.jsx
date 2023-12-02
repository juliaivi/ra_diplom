import { contacts } from "../../data/dataContacts/dataContacts";
import { Link } from "react-router-dom";

export default function Contacts() {
    return (
        <>
            <section className="top-sales">
                <h2 className="text-center">Контакты</h2>
                <p>Наш головной офис расположен в г.Москва, по адресу: {contacts.address}.</p>
                <h5 className="text-center">Координаты для связи:</h5>
                <p>Телефон: <Link to={`tel:${contacts.telephone}`}>{contacts.telephone}</Link> ({contacts.schedule})</p>
                <p>Email: <Link to={`mailto:${contacts.email}`}>{contacts.email}</Link></p>
            </section>
        </>
    )
}