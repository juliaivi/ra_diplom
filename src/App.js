import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Error from "./components/Error/Error";
import Basket from "./components/Basket/Basket";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Contacts from "./components/Contacts/Contacts";
import CartPage from "./components/Main/CartPage/CartPage";
import CatalogPage from "./components/Main/CatalogPage/CatalogPage";
import Banner from "./components/generl/Banner/Banner";
import ThankYouPage from "./components/ThankYouPage/ThankYouPage";

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:id" element={<CartPage />} />
              <Route path="/cart" element={<Basket />} />
              <Route path="/thankyoupage" element={<ThankYouPage />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
