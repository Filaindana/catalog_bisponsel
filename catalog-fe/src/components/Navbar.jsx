import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/product", label: "Product" },
  { to: "/promo", label: "Promo" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 40px", borderBottom: "1px solid #ddd", background: "#fff", position: "sticky", top: 0, zIndex: 100 }}>

      {/* LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={logo} alt="Logo" style={{ height: 40, objectFit: "contain" }} />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <div>
            <b style={{ fontSize: 18, color: "#FE0808" }}>BIZ </b>
            <b style={{ fontSize: 18, color: "#072B50" }}>PONSEL</b>
          </div>
          <span style={{ fontSize: 11, color: "#072B50", letterSpacing: "2px", fontWeight: 600, marginTop: 3 }}>CATALOG</span>
        </div>
      </div>

      {/* MENU */}
      <div style={{ display: "flex", gap: 4 }}>
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            style={({ isActive }) => ({
              textDecoration: "none",
              padding: "8px 14px",
              borderRadius: 8,
              color: isActive ? "#072B50" : "#374151",
              backgroundColor: isActive ? "rgba(7,43,80,0.1)" : "transparent",
              fontWeight: isActive ? 600 : 400,
              fontSize: 14,
              transition: "all 0.2s",
            })}
            onMouseEnter={e => { if (!e.currentTarget.dataset.active) { e.currentTarget.style.backgroundColor = "rgba(7,43,80,0.1)"; e.currentTarget.style.color = "#072B50"; } }}
            onMouseLeave={e => { if (!e.currentTarget.classList.contains("active")) { e.currentTarget.style.backgroundColor = ""; e.currentTarget.style.color = ""; } }}
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* LOGIN BUTTON */}
      <button
        onClick={() => navigate("/login")}
        style={{ display: "flex", alignItems: "center", gap: 8, background: "#072B50", color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600, transition: "background 0.2s ease", fontFamily: "inherit" }}
        onMouseEnter={e => e.currentTarget.style.background = "#0e3d6e"}
        onMouseLeave={e => e.currentTarget.style.background = "#072B50"}
      >
        <span style={{ background: "#fff", borderRadius: "50%", padding: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FiUser size={16} color="#072B50" />
        </span>
        Masuk / Daftar
      </button>
    </nav>
  );
}
