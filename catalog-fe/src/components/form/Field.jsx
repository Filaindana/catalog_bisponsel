import React from "react";

export default function Field({ label, children, hint }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-gray-400 mt-1.5">{hint}</p>}
    </div>
  );
}
