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
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    path: "/admin",
  },
  { label: "Produk", icon: <Package size={18} />, path: "/admin/produk" },
  { label: "Promo", icon: <Tag size={18} />, path: "/admin/promo" },
  { label: "Cabang", icon: <Building2 size={18} />, path: "/admin/cabang" },
  {
    label: "Pengaturan",
    icon: <Settings size={18} />,
    path: "/admin/pengaturan",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-[240px] min-w-[240px] h-screen bg-white/80 backdrop-blur-xl border-r border-gray-200 flex flex-col py-6">
      {/* LOGO */}
      <div className="px-5 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <img
              src={logoImg}
              alt="Logo"
              className="w-10 h-10 rounded-xl object-contain"
            />
          </div>

          <div>
            <h1 className="text-sm font-bold text-gray-800">Bizponsel</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 px-3 py-5 flex flex-col gap-1">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;

          return (
            <div
              key={menu.path}
              onClick={() => navigate(menu.path)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer text-sm transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }
              `}
            >
              {menu.icon}
              <span className="font-medium">{menu.label}</span>
            </div>
          );
        })}
      </div>

      {/* LOG OUT */}
      <div className="px-3 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer text-sm text-red-500 hover:bg-red-50 transition">
          <LogOut size={18} />
          <span className="font-medium">Log Out</span>
        </div>
      </div>
    </div>
  );
}
