import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  textDecoration: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  color: isActive ? "#072B50" : "#374151",
  backgroundColor: isActive ? "rgba(7,43,80,0.1)" : "transparent",
  fontWeight: isActive ? 600 : 400,
  fontSize: "14px",
  transition: "0.2s",
});

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 40px",
        borderBottom: "1px solid #ddd",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ height: "40px", objectFit: "contain" }}
        />
        <b style={{ fontSize: "16px", color: "#072B50" }}>BismarCatalog</b>
      </div>

      {/* MENU */}
      <div style={{ display: "flex", gap: "8px" }}>
        <NavLink
          to="/"
          end
          style={navLinkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(7,43,80,0.1)";
            e.currentTarget.style.color = "#072B50";
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.className.includes("active")) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#374151";
            }
          }}
        >
          Home
        </NavLink>

        <NavLink
          to="/product"
          style={navLinkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(7,43,80,0.1)";
            e.currentTarget.style.color = "#072B50";
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.className.includes("active")) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#374151";
            }
          }}
        >
          Product
        </NavLink>

        <NavLink
          to="/promo"
          style={navLinkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(7,43,80,0.1)";
            e.currentTarget.style.color = "#072B50";
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.className.includes("active")) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#374151";
            }
          }}
        >
          Promo
        </NavLink>

        <NavLink
          to="/contact"
          style={navLinkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(7,43,80,0.1)";
            e.currentTarget.style.color = "#072B50";
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.className.includes("active")) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#374151";
            }
          }}
        >
          Contact
        </NavLink>
      </div>

      {/* LOGIN BUTTON */}
      <button
        onClick={() => navigate("/login")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#072B50",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "10px 18px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 600,
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#0e3d6e")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#072B50")}
      >
        <span
          style={{
            background: "#fff",
            borderRadius: "50%",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FiUser size={16} color="#072B50" />
        </span>
        Masuk / Daftar
      </button>
    </nav>
  );
}
