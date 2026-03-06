import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../assets/logo.png";
import {
  LayoutDashboard,
  Package,
  Tag,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";

const menus = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    path: "/dashboard",
  },
  { label: "Produk", icon: <Package size={18} />, path: "/produk" },
  { label: "Promo", icon: <Tag size={18} />, path: "/promo" },
  { label: "Cabang", icon: <Building2 size={18} />, path: "/cabang" },
  { label: "Pengaturan", icon: <Settings size={18} />, path: "/pengaturan" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        width: "220px",
        minWidth: "220px",
        background: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          padding: "0 20px 28px 20px",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={logoImg}
              alt="Logo"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                objectFit: "contain",
              }}
            />
          </div>
          <div>
            <div
              style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}
            >
              Bizponsel
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div
        style={{
          flex: 1,
          padding: "20px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
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
                gap: "12px",
                padding: "10px 14px",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: isActive ? "#4f46e5" : "transparent",
                color: isActive ? "#fff" : "#374151",
                fontWeight: isActive ? 600 : 400,
                fontSize: "14px",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLDivElement).style.background =
                    "#f1f5f9";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLDivElement).style.background =
                    "transparent";
              }}
            >
              {menu.icon}
              {menu.label}
            </div>
          );
        })}
      </div>

      {/* LOG OUT */}
      <div
        style={{
          padding: "0 12px",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 14px",
            borderRadius: "10px",
            cursor: "pointer",
            color: "#ef4444",
            fontSize: "14px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.background = "#fef2f2")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.background =
              "transparent")
          }
        >
          <LogOut size={18} />
          Log Out
        </div>
      </div>
    </div>
  );
}
