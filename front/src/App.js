import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import { AnimatePresence } from "framer-motion";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

function App() {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
