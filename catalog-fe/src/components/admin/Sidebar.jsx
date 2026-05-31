import { useNavigate, useLocation } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import {
  LayoutDashboard,
  Package,
  Tag,
  Building2,
  Settings,
  LogOut,
  Users,
} from "lucide-react";

const baseMenus = [
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

const superadminMenus = [
  { label: "Dashboard", icon: <LayoutDashboard size={16} />, path: "/admin" },
  { label: "User", icon: <Users size={16} />, path: "/admin/users" },
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

  // Get user from localStorage
  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  };

  const user = getUser();
  const menus = user?.peran === "superadmin" ? superadminMenus : baseMenus;
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col h-screen bg-white border-r w-50 border-slate-100">
      {/* LOGO */}
      <div className="px-4 pt-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-white w-9 h-9 rounded-xl shrink-0">
            <img src={logoImg} alt="Logo" className="object-contain w-5 h-5" />
          </div>
          <div>
            <h1 className="text-[13.5px] font-extrabold text-slate-900 m-0 leading-tight">
              Bizponsel
            </h1>
            <p className="text-[11px] text-slate-400 m-0">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 px-2.5 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <button
              key={menu.path}
              onClick={() => navigate(menu.path)}
              className={`
                group w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px]
                text-[13px] font-semibold transition-all duration-150 text-left border-none cursor-pointer
                ${isActive ? "text-white" : "text-slate-500 hover:text-white"}
              `}
              style={{
                backgroundColor: isActive ? "#0e3d6e" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "#0e3d6e";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span
                className={`flex items-center shrink-0 ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-white"
                }`}
              >
                {menu.icon}
              </span>
              {menu.label}
            </button>
          );
        })}
      </div>

      {/* LOG OUT */}
      <div className="px-2.5 pb-5 pt-2.5 border-t border-slate-100">
        <button 
        onClick={handleLogout}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-all duration-150 border-none bg-transparent text-left cursor-pointer">
          <LogOut size={16} />
          Log Out
        </button>
      </div> 
    </div>
  );
}
