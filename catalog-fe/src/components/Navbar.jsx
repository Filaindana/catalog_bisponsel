import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/product", label: "Product" },
  { to: "/promo", label: "Promo" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-3.5 border-b border-gray-200 bg-white sticky top-0 z-[100]">

      {/* LOGO */}
      <div className="flex items-center gap-2.5">
        <img src={logo} alt="Logo" className="h-10 object-contain" />
        <div className="flex flex-col leading-none">
          <div>
            <b className="text-lg text-[#FE0808]">BIZ </b>
            <b className="text-lg text-[#072B50]">PONSEL</b>
          </div>
          <span className="text-[11px] text-[#072B50] tracking-[2px] font-semibold mt-0.5">
            CATALOG
          </span>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex gap-1">
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-lg text-sm transition ${
                isActive
                  ? "text-[#072B50] bg-[#072B501A] font-semibold"
                  : "text-gray-700 hover:bg-[#072B501A] hover:text-[#072B50]"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* DESKTOP LOGIN */}
      <button
        onClick={() => navigate("/login")}
        className="hidden md:flex items-center gap-2 bg-[#072B50] text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-[#0e3d6e] transition"
      >
        <span className="bg-white rounded-full p-1 flex items-center justify-center">
          <FiUser size={16} color="#072B50" />
        </span>
        Masuk / Daftar
      </button>

      {/* HAMBURGER */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-2xl text-[#072B50]"
      >
        <FiMenu />
      </button>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-[260px] bg-white shadow-lg z-[200] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-[#072B50]">Menu</span>
          <button onClick={() => setOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        {/* MENU LIST */}
        <div className="flex flex-col p-4 gap-2">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm ${
                  isActive
                    ? "bg-[#072B501A] text-[#072B50] font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* LOGIN */}
        <div className="p-4 border-t">
          <button
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#072B50] text-white rounded-xl py-2 text-sm font-semibold hover:bg-[#0e3d6e] transition"
          >
            <FiUser size={16} />
            Masuk / Daftar
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-[150]"
        />
      )}
    </nav>
  );
}