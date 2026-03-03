import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";

<button className="auth-btn">
  <span
    style={{
      background: "white",
      borderRadius: "50%",
      padding: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FiUser size={16} color="#7D0A0A" />
  </span>
  Masuk / Daftar
</button>;

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 40px",
        borderBottom: "1px solid #ddd",
        background: "#fff",
      }}
    >
      {/* LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            height: "40px",
            objectFit: "contain",
          }}
        />
        <b>Biz Ponsel</b>
      </div>

      {/* MENU */}
      <div style={{ display: "flex", gap: "30px" }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            textDecoration: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            color: isActive ? "#072B50" : "black",
            backgroundColor: isActive ? "rgba(220,38,38,0.2)" : "transparent",
            transition: "0.2s",
          })}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(220,38,38,0.2)";
            e.currentTarget.style.color = "#7D0A0A";
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.classList.contains("active")) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "black";
            }
          }}
        >
          Home
        </NavLink>

        <NavLink
          to="/product"
          style={({ isActive }) => ({
            textDecoration: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            color: isActive ? "#7D0A0A" : "black",
            backgroundColor: isActive ? "rgba(220,38,38,0.2)" : "transparent",
            transition: "0.2s",
          })}
        >
          Product
        </NavLink>

        <NavLink
          to="/promo"
          style={({ isActive }) => ({
            textDecoration: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            color: isActive ? "#7D0A0A" : "black",
            backgroundColor: isActive ? "rgba(220,38,38,0.2)" : "transparent",
            transition: "0.2s",
          })}
        >
          Promo
        </NavLink>

        <NavLink
          to="/contact"
          style={({ isActive }) => ({
            textDecoration: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            color: isActive ? "#7D0A0A" : "black",
            backgroundColor: isActive ? "rgba(220,38,38,0.2)" : "transparent",
            transition: "0.2s",
          })}
        >
          Contact
        </NavLink>
      </div>

      {/* LOGIN */}
      <button className="auth-btn">
        <div className="auth-icon">
          <FiUser size={18} color="#072B50" />
        </div>
        Masuk / Daftar
      </button>
    </nav>
  );
}
