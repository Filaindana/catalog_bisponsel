import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/home";
import Product from "./pages/product";
import Promo from "./pages/promo";
import DetailProduct from "./pages/detailproduct";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/register";

function WithNavbar() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<WithNavbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
