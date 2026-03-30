import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Admin layout components
import AdminNavbar  from "./components/admin/Navbar.jsx";
import AdminSidebar from "./components/admin/Sidebar.jsx";

// Public pages
import Home          from "./pages/home.jsx";
import Product       from "./pages/product.jsx";
import Promo         from "./pages/promo.jsx";
import DetailProduct from "./pages/detailproduct.jsx";
import Contact       from "./pages/contact.jsx";
import Login         from "./pages/login.jsx";
import Register      from "./pages/register.jsx";

// Admin pages
import Dashboard   from "./pages/admin/Dashboard.jsx";
import Produk      from "./pages/admin/Produk.jsx";
import PromoAdmin  from "./pages/admin/Promo.jsx";
import Cabang      from "./pages/admin/Cabang.jsx";
import Pengaturan  from "./pages/admin/Pengaturan.jsx";

/* ── Public layout (Navbar + Footer) ── */
function WithNavbar() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/promo"      element={<Promo />} />
        <Route path="/product"    element={<Product />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/contact"    element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

/* ── Admin layout (AdminNavbar + AdminSidebar) ── */
function AdminLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminNavbar />
      <div style={{ display: "flex", flex: 1 }}>
        <AdminSidebar />
        <main style={{ flex: 1, overflow: "auto" }}>
          <Routes>
            <Route path="/"           element={<Dashboard />} />
            <Route path="/produk"     element={<Produk />} />
            <Route path="/promo"      element={<PromoAdmin />} />
            <Route path="/cabang"     element={<Cabang />} />
            <Route path="/pengaturan" element={<Pengaturan />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

/* ── Root ── */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*"  element={<AdminLayout />} />
        <Route path="/*"        element={<WithNavbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;