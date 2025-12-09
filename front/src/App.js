import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import { AnimatePresence } from "framer-motion";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Wishlist from "./pages/wishlist";
import OnSale from "./pages/OnSale";
import NewArrivals from "./pages/NewArrivals";
import Checkout from "./pages/Checkout";
import Callback from "./pages/Callback";
import Cancel from "./pages/Cancel";
import axios from "axios";
import LocationMap from "./pages/LocationMap";
import ProductDetails from "./pages/ProductDetails";
import User from "./pages/User";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="shop/product" element={<ProductDetails />} />
            <Route path="/shop/sale" element={<OnSale />} />
            <Route path="/shop/new" element={<NewArrivals />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/user" element={<User />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/location" element={<LocationMap />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
