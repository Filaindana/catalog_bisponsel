import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero1.jpg";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        position: "relative",
        height: "570px",
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.3))",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingLeft: "80px",
          maxWidth: "600px",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "550px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: "1.2",
              marginBottom: "20px",
            }}
          >
            Solusi Teknologi{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Terpercaya{" "}
            </span>
            <br />
            untuk Bisnis Anda
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#e5e7eb",
              marginBottom: "30px",
              lineHeight: 1.7,
            }}
          >
            PT Indo Bismar menghadirkan produk IT dan perangkat teknologi
            berkualitas melalui jaringan distribusi profesional di seluruh
            Indonesia.
          </p>

          <button
            onClick={() => navigate("/product")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "50px",
              background: "#fff",
              color: "#072B50",
              fontSize: "15px",
              fontWeight: 700,
              border: "2px solid #fff",
              cursor: "pointer",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#072B50";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              (e.currentTarget as HTMLButtonElement).style.border =
                "2px solid #fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#fff";
              (e.currentTarget as HTMLButtonElement).style.color = "#072B50";
              (e.currentTarget as HTMLButtonElement).style.border =
                "2px solid #fff";
            }}
          >
            Lihat Detail
            <span style={{ fontSize: "16px" }}>›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
