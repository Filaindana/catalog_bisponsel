import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FiUser, FiMenu, FiX, FiLogOut, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/product", label: "Product" },
  { to: "/promo", label: "Promo" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const user = getUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMobileOpen(false);
    navigate("/login");
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-10 py-3.5 border-b border-gray-200 bg-white sticky top-0 z-100">

        {/* ── LOGO ── */}
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Logo" className="object-contain h-10" />
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

        {/* ── DESKTOP MENU ── */}
        <div className="hidden gap-1 md:flex">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "text-[#072B50] bg-[#072B501A] font-semibold"
                    : "text-gray-600 hover:bg-[#072B501A] hover:text-[#072B50]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* ── DESKTOP RIGHT ── */}
        <div
          className="relative hidden md:block"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button
            onClick={() => navigate(user ? "/profile" : "/login")}
            className="flex items-center gap-2 bg-[#072B50] hover:bg-[#0e3d6e] text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 border-0 cursor-pointer font-[inherit]"
          >
            <span className="flex items-center justify-center p-1 bg-white rounded-full">
              <FiUser size={15} color="#072B50" />
            </span>
            {user ? user.nama : "Masuk / Daftar"}
          </button>

          {/* Dropdown */}
          {user && showDropdown && (
            <div className="absolute top-full right-0 pt-2 z-110">
            <div className="bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.10)] min-w-42.5 overflow-hidden border border-gray-100">
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 transition-colors cursor-pointer hover:bg-gray-50"
              >
                <FiUser size={14} className="text-[#072B50]" />
                My Profile
              </div>
              <div className="border-t border-gray-100" />
              <div
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-600 transition-colors cursor-pointer hover:bg-red-50"
              >
                <FiLogOut size={14} />
                Logout
              </div>
            </div>
            </div>
          )}
        </div>

        {/* ── HAMBURGER (mobile only) ── */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-[#072B50] hover:bg-[#072B501A] transition-colors border-0 bg-transparent cursor-pointer"
        >
          <FiMenu size={22} />
        </button>
      </nav>

      {/* ── MOBILE OVERLAY ── */}
      {mobileOpen && (
        <div
          onClick={closeMobile}
          className="fixed inset-0 bg-black/30 z-150 md:hidden"
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`fixed top-0 right-0 h-full w-70 bg-white z-200 flex flex-col shadow-2xl md:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="object-contain h-8" />
            <span className="font-bold text-[#072B50] text-sm">BIZ PONSEL</span>
          </div>
          <button
            onClick={closeMobile}
            className="flex items-center justify-center text-gray-500 transition-colors bg-transparent border-0 cursor-pointer w-9 h-9 rounded-xl hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* User info (if logged in) */}
        {user && (
          <div
            onClick={() => { navigate("/profile"); closeMobile(); }}
            className="flex items-center gap-3 mx-4 mt-4 p-3.5 rounded-xl bg-[#072B50]/5 border border-[#072B50]/10 cursor-pointer hover:bg-[#072B50]/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#072B50] flex items-center justify-center shrink-0">
              <FiUser size={16} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#072B50] truncate">{user.nama}</p>
              <p className="text-xs text-gray-400 truncate">{user.email || "Lihat profil"}</p>
            </div>
            <FiChevronRight size={16} className="text-gray-400 shrink-0" />
          </div>
        )}

        {/* Nav links */}
        <div className="flex flex-col flex-1 gap-1 p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1">Menu</p>
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={closeMobile}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
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

        {/* Bottom action */}
        <div className="flex flex-col gap-2 p-4 border-t border-gray-100">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl py-2.5 text-sm font-semibold transition-colors cursor-pointer font-[inherit]"
            >
              <FiLogOut size={15} />
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => { navigate("/login"); closeMobile(); }}
                className="w-full flex items-center justify-center gap-2 bg-[#072B50] hover:bg-[#0e3d6e] text-white rounded-xl py-2.5 text-sm font-semibold transition-colors border-0 cursor-pointer font-[inherit]"
              >
                <FiUser size={15} />
                Masuk
              </button>
              <button
                onClick={() => { navigate("/register"); closeMobile(); }}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#072B50] border border-[#072B50] rounded-xl py-2.5 text-sm font-semibold transition-colors cursor-pointer font-[inherit]"
              >
                Daftar
              </button>
            </>
          
          )}
        </div>
      </div>
    </>
  );
}