import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Produk from "./pages/Produk";
import Promo from "./pages/Promo";
import Cabang from "./pages/Cabang";
import Pengaturan from "./pages/Pengaturan";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Navbar />
        <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/produk"
          element={
            <AdminLayout>
              <Produk />
            </AdminLayout>
          }
        />
        <Route
          path="/promo"
          element={
            <AdminLayout>
              <Promo />
            </AdminLayout>
          }
        />
        <Route
          path="/cabang"
          element={
            <AdminLayout>
              <Cabang />
            </AdminLayout>
          }
        />
        <Route
          path="/pengaturan"
          element={
            <AdminLayout>
              <Pengaturan />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
