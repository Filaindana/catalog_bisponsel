import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import {
  LayoutDashboard,
  Package,
  Tag,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";

const menus = [
  { label: "Dashboard", icon: <LayoutDashboard size={16} />, path: "/admin" },
  { label: "Produk", icon: <Package size={16} />, path: "/admin/produk" },
  { label: "Promo", icon: <Tag size={16} />, path: "/admin/promo" },
  { label: "Cabang", icon: <Building2 size={16} />, path: "/admin/cabang" },
  {
    label: "Pengaturan",
    icon: <Settings size={16} />,
    path: "/admin/pengaturan",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        width: "220px",
        minWidth: "220px",
        height: "100vh",
        background: "#fff",
        borderRight: "1px solid #f1f5f9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* LOGO */}
      <div
        style={{ padding: "20px 16px 16px", borderBottom: "1px solid #f1f5f9" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#072B50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={logoImg}
              alt="Logo"
              style={{ width: "22px", height: "22px", objectFit: "contain" }}
            />
          </div>
          <div>
            <h1
              style={{
                fontSize: "14px",
                fontWeight: 800,
                color: "#0f172a",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              BismarCatalog
            </h1>
            <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div
        style={{
          flex: 1,
          padding: "10px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;

          return (
            <div
              key={menu.path}
              onClick={() => navigate(menu.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
                transition: "all 0.15s",
                background: isActive ? "#072B50" : "transparent",
                color: isActive ? "#fff" : "#64748b",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(7,43,80,0.06)";
                  e.currentTarget.style.color = "#072B50";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#64748b";
                }
              }}
            >
              <span
                style={{
                  color: isActive ? "#fff" : "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {menu.icon}
              </span>
              {menu.label}
            </div>
          );
        })}
      </div>

      {/* LOG OUT */}
      <div style={{ padding: "10px 10px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "9px 12px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            color: "#ef4444",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fef2f2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <LogOut size={16} />
          Log Out
        </div>
      </div>
    </div>
  );
}
