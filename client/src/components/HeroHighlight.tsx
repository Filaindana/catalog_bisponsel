import { FiBox, FiUsers, FiTag, FiShield } from "react-icons/fi";

export default function HeroHighlight() {
  const items = [
    {
      icon: <FiBox size={22} />,
      title: "Stok Terupdate",
      desc: "Selalu diperbarui",
    },
    {
      icon: <FiUsers size={22} />,
      title: "Layanan Terbaik",
      desc: "Cepat dan responsif",
    },
    {
      icon: <FiTag size={22} />,
      title: "Harga Kompetitif",
      desc: "Bersaing dan transparan",
    },
    {
      icon: <FiShield size={22} />,
      title: "Produk Berkualitas",
      desc: "Terjamin dan terpercaya",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "-50px auto 0 auto",
        padding: "0 20px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(90deg, #072B50 0%, #1e40af 50%, #7c3aed 100%)",
          borderRadius: "7px",
          padding: "22px 30px",
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
              gap: "14px",
              minWidth: "220px",
            }}
          >
            {/* ICON BULAT */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#072B50",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              {item.icon}
            </div>

            {/* TEXT */}
            <div>
              <div style={{ fontWeight: 600, fontSize: "15px" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.85 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
