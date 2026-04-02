import { FiBox, FiUsers, FiTag, FiShield } from "react-icons/fi";

export default function HeroHighlight() {
  const items = [
    { icon: <FiBox size={28} />,    title: "Stok Terupdate",     desc: "Selalu diperbarui" },
    { icon: <FiUsers size={28} />,  title: "Layanan Terbaik",    desc: "Cepat dan responsif" },
    { icon: <FiTag size={28} />,    title: "Harga Kompetitif",   desc: "Bersaing dan transparan" },
    { icon: <FiShield size={28} />, title: "Produk Berkualitas", desc: "Terjamin dan terpercaya" },
  ];

  return (
    <div style={{ width: "100%", marginTop: -50, position: "relative", zIndex: 10 }}>
      <div style={{
        background: "linear-gradient(to right, #072B50, #1e40af, #7c3aed)",
        padding: "28px 0",
        color: "#fff",
        boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, flex: 1, justifyContent: "center" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#072B50", boxShadow: "0 4px 10px rgba(0,0,0,0.15)", flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{item.title}</div>
                <div style={{ fontSize: 14, opacity: 0.85, marginTop: 2 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
