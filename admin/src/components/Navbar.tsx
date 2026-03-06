import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/produk": "Produk",
  "/promo": "Promo",
  "/cabang": "Cabang",
  "/pengaturan": "Pengaturan",
};

export default function Navbar() {
  const location = useLocation();
  const currentPage = breadcrumbMap[location.pathname] || "Dashboard";

  return (
    <div
      style={{
        height: "64px",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
      }}
    >
      {/* BREADCRUMB */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "14px", color: "#9ca3af" }}>Admin</span>
        <span style={{ fontSize: "14px", color: "#9ca3af" }}>/</span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
          {currentPage}
        </span>
      </div>

      {/* SEARCH */}
      <div
        style={{
          position: "relative",
          flex: 1,
          maxWidth: "400px",
          margin: "0 32px",
        }}
      >
        <Search
          size={16}
          color="#9ca3af"
          style={{
            position: "absolute",
            left: "14px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <input
          type="text"
          placeholder="Search product, promo, or branch..."
          style={{
            width: "100%",
            padding: "10px 16px 10px 40px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box" as const,
            color: "#374151",
          }}
        />
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* NOTIF */}
        <div
          style={{
            position: "relative",
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: "#f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Bell size={18} color="#374151" />
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#ef4444",
            }}
          />
        </div>

        {/* ADMIN INFO */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#111827",
                margin: 0,
              }}
            >
              Admin Bizponsel
            </p>
          </div>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              fontWeight: 700,
              color: "#fff",
              boxShadow: "0 2px 8px rgba(79,70,229,0.4)",
              flexShrink: 0,
            }}
          >
            AB
          </div>
        </div>
      </div>
    </div>
  );
}
