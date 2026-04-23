import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { FavoritProvider } from "./context/FavoritContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
// import "./index.css";

// Admin layout components
import AdminNavbar from "./components/admin/Navbar.jsx";
import AdminSidebar from "./components/admin/Sidebar.jsx";

// Public pages
import Home from "./pages/home.jsx";
import Product from "./pages/product.jsx";
import Promo from "./pages/promo.jsx";
import DetailProduct from "./pages/detailproduct.jsx";
import Contact from "./pages/contact.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";

// Admin page
import Dashboard from "./pages/admin/Dashboard.jsx";
import Produk from "./pages/admin/Produk.jsx";
import PromoAdmin from "./pages/admin/Promo.jsx";
import Cabang from "./pages/admin/Cabang.jsx";
import Pengaturan from "./pages/admin/Pengaturan.jsx";
import Profile from "./pages/Profile.jsx";

/* ── Public layout ── */
function PublicLayout() {
  return (
    <FavoritProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </FavoritProvider>
  );
}

/* ── Admin layout ── */
function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <AdminSidebar />
      <main className="p-8 pt-16 ml-50">
        <Outlet />
      </main>
    </div>
  );
}

/* ── Root ── */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="promo" element={<Promo />} />
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<DetailProduct />} />
          {/* <Route path="product/detail" element={<DetailProduct />} /> */}
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="produk" element={<Produk />} />
          <Route path="promo" element={<PromoAdmin />} />
          <Route path="cabang" element={<Cabang />} />
          <Route path="pengaturan" element={<Pengaturan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
