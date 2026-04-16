import { FiBox, FiUsers, FiTag, FiShield } from "react-icons/fi";

export default function HeroHighlight() {
  const items = [
    { icon: <FiBox size={28} />,    title: "Stok Terupdate",     desc: "Selalu diperbarui" },
    { icon: <FiUsers size={28} />,  title: "Layanan Terbaik",    desc: "Cepat dan responsif" },
    { icon: <FiTag size={28} />,    title: "Harga Kompetitif",   desc: "Bersaing dan transparan" },
    { icon: <FiShield size={28} />, title: "Produk Berkualitas", desc: "Terjamin dan terpercaya" },
  ];

  return (
    <div className="w-full -mt-12.5 relative z-10">
      <div
        className="text-white py-7"
        style={{
          background: "linear-gradient(to right, #072B50, #1e40af, #7c3aed)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
        }}
      >
        <div className="grid grid-cols-2 gap-6 px-10 mx-auto max-w-350 md:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-4.5 justify-center">
              <div className="w-15 h-15 shrink-0 rounded-full bg-white flex items-center justify-center text-[#072B50]"
                style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.15)" }}
              >
                {item.icon}
              </div>
              <div>
                <div className="font-bold text-[17px]">{item.title}</div>
                <div className="text-sm opacity-85 mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}