import { FiBox, FiUsers, FiTag, FiShield } from "react-icons/fi";

export default function HeroHighlight() {
  const items = [
    {
      icon: <FiBox size={28} />,
      title: "Stok Terupdate",
      desc: "Selalu diperbarui",
    },
    {
      icon: <FiUsers size={28} />,
      title: "Layanan Terbaik",
      desc: "Cepat dan responsif",
    },
    {
      icon: <FiTag size={28} />,
      title: "Harga Kompetitif",
      desc: "Bersaing dan transparan",
    },
    {
      icon: <FiShield size={28} />,
      title: "Produk Berkualitas",
      desc: "Terjamin dan terpercaya",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        margin: "-50px 0 0 0",
        padding: "0",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(90deg, #072B50 0%, #1e40af 50%, #7c3aed 100%)",
          borderRadius: "0px",
          padding: "28px 60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {/* ICON BULAT */}
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#072B50",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>

            {/* TEXT */}
            <div>
              <div style={{ fontWeight: 700, fontSize: "17px" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.85, marginTop: "2px" }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}