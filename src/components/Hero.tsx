import heroImg from "../assets/hero1.jpg";

export default function Hero() {
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
            <span style={{ color: "#DC2626" }}>Terpercaya </span>
            <br />
            untuk Bisnis Anda
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#e5e7eb",
              marginBottom: "30px",
            }}
          >
            PT Indo Bismar menghadirkan produk IT dan perangkat teknologi
            berkualitas melalui jaringan distribusi profesional di seluruh
            Indonesia.
          </p>

          <button className="hero-btn">
            Lihat Detail
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
