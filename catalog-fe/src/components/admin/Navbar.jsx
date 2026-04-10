import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const breadcrumbMap = {
  "/admin": { parent: "Admin", child: "Dashboard" },
  "/admin/produk": { parent: "Admin", child: "Produk" },
  "/admin/promo": { parent: "Admin", child: "Promo" },
  "/admin/cabang": { parent: "Admin", child: "Cabang" },
  "/admin/pengaturan": { parent: "Admin", child: "Pengaturan" },
};

export default function Navbar() {
  const location = useLocation();
  const crumb = breadcrumbMap[location.pathname] || {
    parent: "Admin",
    child: "Dashboard",
  };

  return (
    <div className="fixed top-0 left-[200px] right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-40">
      {/* LEFT — Breadcrumb */}
      <div className="flex items-center gap-1.5">
        <span className="text-[14px] text-slate-400 font-medium">
          {crumb.parent}
        </span>
        <span className="text-[14px] text-slate-400">/</span>
        <span className="text-[14px] font-bold text-indigo-700">
          {crumb.child}
        </span>
      </div>

      {/* CENTER — Search */}
      <div className="relative flex-1 max-w-[420px] mx-8">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search product, promo, or branch..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[13px] text-slate-600 placeholder:text-slate-400 outline-none focus:border-indigo-300 focus:bg-white transition-all"
        />
      </div>

      {/* RIGHT — Bell + Admin */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
          <Bell size={17} className="text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </div>

        {/* Admin Info */}
        <div className="flex items-center gap-2.5">
          <span className="text-[13px] font-semibold text-slate-800">
            Admin Bizponsel
          </span>
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
            <span className="text-[13px] font-bold text-slate-500">AB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
