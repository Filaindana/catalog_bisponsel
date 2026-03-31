import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Building2,
  ExternalLink,
} from "lucide-react";
import ceoImg from "../assets/ceo.jpg";

/* ── Google Font — Inter ── */
if (
  typeof document !== "undefined" &&
  !document.querySelector("[data-font-bismar]")
) {
  const s = document.createElement("style");
  s.setAttribute("data-font-bismar", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; font-family: 'Inter', sans-serif; }
    body, button, input, textarea, select { font-family: 'Inter', sans-serif; }
  `;
  document.head.appendChild(s);
}

const FacebookIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#ffffff"
      d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"
    />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#ffffff"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.645.07-4.849.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.157 3.355.673 1.965 2.063.573 3.453.157 5.195.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.858.501 3.6 1.893 4.99 1.39 1.39 3.132 1.808 4.99 1.893C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.858-.085 3.6-.501 4.99-1.893 1.392-1.39 1.808-3.132 1.893-4.99.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.085-1.858-.501-3.6-1.893-4.99C20.548.673 18.805.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
    />
  </svg>
);

const TikTokIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#ffffff"
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"
    />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#ffffff"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.555 9.555 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 0C5.495 0 .16 5.335.157 11.892a11.85 11.85 0 0 0 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005C18.555 23.794 24 18.459 24 11.893A11.817 11.817 0 0 0 12.05 0zm0 21.785a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.825 9.825 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.889 9.884z"
    />
  </svg>
);

const socialLinks = [
  {
    label: "Facebook",
    username: "@BizPonselOfficial",
    desc: "Ikuti kami di Facebook untuk info terbaru",
    href: "https://facebook.com/BizPonselOfficial",
    bg: "#1877f2",
    icon: (s) => <FacebookIcon size={s} />,
  },
  {
    label: "Instagram",
    username: "@bizponsel.id",
    desc: "Lihat foto & promo terbaru kami",
    href: "https://instagram.com/bizponsel.id",
    bg: "radial-gradient(circle at 30% 110%, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    bgSolid: "#dc2743",
    icon: (s) => <InstagramIcon size={s} />,
  },
  {
    label: "TikTok",
    username: "@bizponsel",
    desc: "Tonton konten & review produk kami",
    href: "https://tiktok.com/@bizponsel",
    bg: "#010101",
    icon: (s) => <TikTokIcon size={s} />,
  },
  {
    label: "WhatsApp",
    username: "+62 811-3077-5195",
    desc: "Chat langsung dengan tim kami",
    href: "https://wa.me/6281130775195",
    bg: "#25d366",
    icon: (s) => <WhatsAppIcon size={s} />,
  },
];

function SocialIcon({ sl, size = 44, iconSize = 22 }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const btnBg = sl.bgSolid || sl.bg;
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        title={sl.label}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "10px",
          background: sl.bg,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          flexShrink: 0,
          padding: 0,
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          outline: open ? "2.5px solid rgba(255,255,255,0.55)" : "none",
          outlineOffset: "2px",
          transition: "transform .15s, box-shadow .15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
        }}
      >
        {sl.icon(iconSize)}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            borderRadius: "14px",
            padding: "16px",
            boxShadow: "0 16px 48px rgba(7,43,80,0.18)",
            border: "1px solid #dce6f0",
            width: "200px",
            zIndex: 99,
            animation: "popIn .18s cubic-bezier(.34,1.56,.64,1) both",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "12px",
              height: "12px",
              background: "#fff",
              border: "1px solid #dce6f0",
              borderTop: "none",
              borderLeft: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                background: sl.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {sl.icon(13)}
            </div>
            <span
              style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}
            >
              {sl.label}
            </span>
          </div>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#072B50",
              margin: "0 0 3px 0",
            }}
          >
            {sl.username}
          </p>
          <p
            style={{
              fontSize: "11px",
              color: "#9ca3af",
              margin: "0 0 12px 0",
              lineHeight: 1.45,
            }}
          >
            {sl.desc}
          </p>
          <a
            href={sl.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              background: btnBg,
              color: "#fff",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: 700,
              boxSizing: "border-box",
            }}
          >
            Kunjungi <ExternalLink size={11} />
          </a>
        </div>
      )}
    </div>
  );
}

const TEMP_ADDRESS =
  "Jl. Bendul Merisi Selatan XI No. 59-61, Kecamatan Wonocolo, Kota Surabaya.";
const TEMP_MAPS =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.096!2d112.7452!3d-7.3118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0b5c5e5e5f%3A0x1234567890abcdef!2sJl.%20Bendul%20Merisi%20Selatan%20XI%2C%20Bendul%20Merisi%2C%20Kec.%20Wonocolo%2C%20Kota%20SBY%2C%20Jawa%20Timur%2060239!5e0!3m2!1sid!2sid!4v1";

const branches = [
  {
    name: "Cabang Surabaya Pusat",
    address: TEMP_ADDRESS,
    phone: "+62 812-3456-7890",
    hours: "Senin–Sabtu, 08.00–17.00",
    email: "surabayapusat@bismarcatalog.com",
    city: "Surabaya",
    image: null,
    maps: TEMP_MAPS,
  },
  {
    name: "Cabang Surabaya Timur",
    address: TEMP_ADDRESS,
    phone: "+62 812-3456-7891",
    hours: "Senin–Sabtu, 08.00–17.00",
    email: "surabayatimur@bismarcatalog.com",
    city: "Surabaya",
    image: null,
    maps: TEMP_MAPS,
  },
  {
    name: "Cabang Surabaya Barat",
    address: TEMP_ADDRESS,
    phone: "+62 812-3456-7892",
    hours: "Senin–Sabtu, 08.00–17.00",
    email: "surabayabarat@bismarcatalog.com",
    city: "Surabaya",
    image: null,
    maps: TEMP_MAPS,
  },
  {
    name: "Cabang Sidoarjo",
    address: TEMP_ADDRESS,
    phone: "+62 812-3456-7893",
    hours: "Senin–Sabtu, 08.00–17.00",
    email: "sidoarjo@bismarcatalog.com",
    city: "Sidoarjo",
    image: null,
    maps: TEMP_MAPS,
  },
  {
    name: "Cabang Gresik",
    address: TEMP_ADDRESS,
    phone: "+62 812-3456-7894",
    hours: "Senin–Sabtu, 08.00–17.00",
    email: "gresik@bismarcatalog.com",
    city: "Gresik",
    image: null,
    maps: TEMP_MAPS,
  },
  {
    name: "Cabang Malang",
    address: TEMP_ADDRESS,
    phone: "+62 812-3456-7895",
    hours: "Senin–Sabtu, 08.00–17.00",
    email: "malang@bismarcatalog.com",
    city: "Malang",
    image: null,
    maps: TEMP_MAPS,
  },
];

const schedule = [
  { day: "Senin", open: "08:30", close: "17:00", isOpen: true },
  { day: "Selasa", open: "08:30", close: "17:00", isOpen: true },
  { day: "Rabu", open: "08:30", close: "17:00", isOpen: true },
  { day: "Kamis", open: "08:30", close: "17:00", isOpen: true },
  { day: "Jumat", open: "08:30", close: "17:00", isOpen: true },
  { day: "Sabtu", open: "08:00", close: "15:00", isOpen: true },
  { day: "Minggu", open: null, close: null, isOpen: false },
];

const NAVY = "#072B50";
const NAVY_LIGHT = "#0a3460";
const NAVY_FAINT = "#f0f4f9";
const NAVY_BORDER = "#dce6f0";

function BranchCard({ branch, index, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  const hasImg = branch.image && !imgErr;
  const accents = [
    "#1660b8",
    "#0d4280",
    "#0e5099",
    "#163d6e",
    "#0f4d90",
    "#1a5fa8",
  ];
  const accent = accents[index % accents.length];
  return (
    <div
      className="bcard"
      onClick={onClick}
      style={{
        cursor: "pointer",
        borderRadius: "18px",
        overflow: "hidden",
        background: "#fff",
        border: `1px solid ${NAVY_BORDER}`,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 12px rgba(7,43,80,.07)",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "180px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {hasImg ? (
          <img
            src={branch.image}
            alt={branch.name}
            onError={() => setImgErr(true)}
            className="bcard-img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform .55s cubic-bezier(.25,.46,.45,.94)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(145deg, ${NAVY} 0%, ${accent} 100%)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0.12,
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id={`dot${index}`}
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#dot${index})`} />
            </svg>
            <span
              style={{
                position: "absolute",
                right: "-8px",
                bottom: "-16px",
                fontSize: "100px",
                fontWeight: 900,
                color: "rgba(255,255,255,0.06)",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Building2
                  size={24}
                  style={{ color: "rgba(255,255,255,0.55)" }}
                />
              </div>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  fontWeight: 600,
                }}
              >
                Foto Segera Hadir
              </span>
            </div>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background:
              "linear-gradient(to top, rgba(7,43,80,.7) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(255,255,255,0.95)",
            borderRadius: "30px",
            padding: "5px 11px",
            boxShadow: "0 2px 10px rgba(0,0,0,.18)",
          }}
        >
          <MapPin size={9} style={{ color: NAVY }} />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: NAVY,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            {branch.city}
          </span>
        </div>
      </div>
      <div
        style={{
          padding: "20px 20px 22px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <p
          className="bcard-name"
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: NAVY,
            margin: "0 0 14px 0",
            lineHeight: 1.3,
          }}
        >
          {branch.name.replace("Cabang ", "")}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "2px",
              borderRadius: "2px",
              background: accent,
            }}
          />
          <div style={{ flex: 1, height: "1px", background: NAVY_BORDER }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "9px",
            flex: 1,
          }}
        >
          {[
            { icon: <MapPin size={11} />, value: branch.address },
            { icon: <Phone size={11} />, value: branch.phone },
            { icon: <Clock size={11} />, value: branch.hours },
          ].map((row, j) => (
            <div
              key={j}
              style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}
            >
              <span style={{ color: accent, flexShrink: 0, marginTop: "2px" }}>
                {row.icon}
              </span>
              <span
                style={{ fontSize: "12px", color: "#5a6882", lineHeight: 1.55 }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <div
          className="bcard-footer"
          style={{
            marginTop: "18px",
            paddingTop: "14px",
            borderTop: `1px solid ${NAVY_BORDER}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            className="bcard-chevron"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "5px 12px 5px 10px",
              borderRadius: "20px",
              background: NAVY_FAINT,
              border: `1px solid ${NAVY_BORDER}`,
              transition: "all .25s ease",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 600, color: NAVY }}>
              Detail
            </span>
            <ChevronRight size={12} style={{ color: NAVY }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [now, setNow] = useState(new Date());
  const [jamOpen, setJamOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const h = now.getHours(),
    m = now.getMinutes();
  const dayIdx = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const isOpen = (() => {
    const row = schedule[dayIdx];
    if (!row.isOpen) return false;
    const [oh, om] = row.open.split(":").map(Number);
    const [ch, cm] = row.close.split(":").map(Number);
    return h * 60 + m >= oh * 60 + om && h * 60 + m < ch * 60 + cm;
  })();

  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @keyframes pulse2  { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
        @keyframes popIn   { from{opacity:0;transform:translateX(-50%) scale(.88)} to{opacity:1;transform:translateX(-50%) scale(1)} }
        .bcard { transition: transform .3s cubic-bezier(.34,1.3,.64,1), box-shadow .3s ease; }
        .bcard:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 28px 60px rgba(7,43,80,.14) !important; }
        .bcard:hover .bcard-img { transform: scale(1.08); }
        .bcard:hover .bcard-arrow { background: rgba(255,255,255,0.28) !important; transform: rotate(0deg) scale(1.1); }
        .bcard:hover .bcard-chevron { background: ${NAVY} !important; border-color: ${NAVY} !important; }
        .bcard:hover .bcard-chevron span, .bcard:hover .bcard-chevron svg { color: #fff !important; }
        .bcard:hover .bcard-name { color: #0a3460 !important; }
      `}</style>

      {/* HERO */}
      <div
        style={{
          background: "#fff",
          padding: "60px 40px",
          textAlign: "center",
          borderBottom: `1px solid ${NAVY_BORDER}`,
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 800,
            color: NAVY,
            margin: "0 0 12px 0",
            letterSpacing: "-0.5px",
          }}
        >
          Contact us
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#6b7280",
            margin: "0 auto",
            maxWidth: "440px",
            lineHeight: 1.75,
          }}
        >
          Ada pertanyaan atau butuh bantuan? Kami siap membantu Anda.
        </p>
      </div>

      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "30px 40px" }}
      >
        {/* BAGIAN 1 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "32px",
              border: `1px solid ${NAVY_BORDER}`,
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: NAVY,
                margin: "0 0 6px 0",
              }}
            >
              Informasi Kontak
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#9ca3af",
                margin: "0 0 28px 0",
                lineHeight: 1.6,
              }}
            >
              Jangan ragu untuk menghubungi kami kapan saja.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              {[
                {
                  icon: <MapPin size={16} />,
                  label: "Alamat",
                  value:
                    "Jl. Raya Rungkut Kidul No. 32, Rungkut Kidul, Kec. Rungkut, Surabaya, Jawa Timur 60293.",
                },
                {
                  icon: <Phone size={16} />,
                  label: "Telepon",
                  value: "+6281130775195",
                },
                {
                  icon: <Mail size={16} />,
                  label: "Email",
                  value: "info@bizponselcatalog.com",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "9px",
                      background: NAVY,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        margin: "0 0 3px 0",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#111827",
                        margin: 0,
                        fontWeight: 600,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "24px" }}>
              <div
                onClick={() => setJamOpen(!jamOpen)}
                style={{
                  background: NAVY_FAINT,
                  borderRadius: jamOpen ? "10px 10px 0 0" : "10px",
                  padding: "13px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  border: `1px solid ${jamOpen ? NAVY : NAVY_BORDER}`,
                  borderBottom: jamOpen
                    ? `1px solid ${NAVY_BORDER}`
                    : undefined,
                  transition: "all .2s",
                }}
              >
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <Clock size={15} style={{ color: NAVY }} />
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#6b7280",
                        margin: 0,
                        fontWeight: 600,
                      }}
                    >
                      Jam Operasional
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: isOpen ? "#22c55e" : "#9ca3af",
                          animation: isOpen ? "pulse2 2s infinite" : "none",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "11px",
                          color: isOpen ? "#15803d" : "#9ca3af",
                          margin: 0,
                          fontWeight: 600,
                        }}
                      >
                        {isOpen
                          ? `Sedang Buka · Tutup ${schedule[dayIdx].close.replace(":", ".")} WIB`
                          : "Tutup"}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    transform: jamOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform .25s",
                  }}
                >
                  <ChevronRight size={14} style={{ color: NAVY }} />
                </div>
              </div>
              {jamOpen && (
                <div
                  style={{
                    border: `1px solid ${NAVY}`,
                    borderTop: "none",
                    borderRadius: "0 0 10px 10px",
                    overflow: "hidden",
                    animation: "fadeUp .2s ease both",
                  }}
                >
                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                  >
                    <div style={{ borderRight: `1px solid ${NAVY_BORDER}` }}>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: NAVY,
                          opacity: 0.4,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          margin: 0,
                          padding: "10px 14px 6px",
                          borderBottom: `1px solid ${NAVY_BORDER}`,
                        }}
                      >
                        Jam Kerja Pusat
                      </p>
                      {[
                        {
                          label: "Senin – Jumat",
                          value: "08.30 – 17.00",
                          libur: false,
                        },
                        {
                          label: "Sabtu",
                          value: "08.00 – 15.00",
                          libur: false,
                        },
                        {
                          label: "Minggu & Nasional",
                          value: "Libur",
                          libur: true,
                        },
                      ].map((row, i, arr) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "9px 14px",
                            borderBottom:
                              i < arr.length - 1
                                ? `1px solid ${NAVY_BORDER}`
                                : "none",
                            background: "#fff",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              color: row.libur ? "#9ca3af" : "#374151",
                            }}
                          >
                            {row.label}
                          </span>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 700,
                              color: row.libur ? "#9ca3af" : NAVY,
                            }}
                          >
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: NAVY,
                          opacity: 0.4,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          margin: 0,
                          padding: "10px 14px 6px",
                          borderBottom: `1px solid ${NAVY_BORDER}`,
                        }}
                      >
                        Jam Shift Cabang
                      </p>
                      {[
                        {
                          name: "Marina",
                          shift1: "09.30–16.00",
                          shift2: "16.00–21.30",
                        },
                        {
                          name: "Store Street",
                          shift1: "07.30–14.30",
                          shift2: "15.00–22.00",
                        },
                      ].map((row, i, arr) => (
                        <div
                          key={i}
                          style={{
                            padding: "9px 14px",
                            borderBottom:
                              i < arr.length - 1
                                ? `1px solid ${NAVY_BORDER}`
                                : "none",
                            background: "#fff",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              color: NAVY,
                              opacity: 0.5,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              margin: "0 0 5px 0",
                            }}
                          >
                            {row.name}
                          </p>
                          <div style={{ display: "flex", gap: "5px" }}>
                            {[row.shift1, row.shift2].map((sh, j) => (
                              <div
                                key={j}
                                style={{
                                  flex: 1,
                                  padding: "5px 8px",
                                  background: NAVY_FAINT,
                                  border: `1px solid ${NAVY_BORDER}`,
                                  borderRadius: "6px",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "9px",
                                    color: "#9ca3af",
                                    margin: "0 0 1px 0",
                                    fontWeight: 600,
                                  }}
                                >
                                  Shift {j + 1}
                                </p>
                                <p
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    color: NAVY,
                                    margin: 0,
                                  }}
                                >
                                  {sh}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              borderRadius: "16px",
              position: "relative",
              overflow: "hidden",
              minHeight: "400px",
              border: `1px solid ${NAVY_BORDER}`,
            }}
          >
            <img
              src={ceoImg}
              alt="CEO"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "top",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to top, ${NAVY} 38%, transparent 100%)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                left: "24px",
                right: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.8)",
                  margin: "0 0 14px 0",
                  fontStyle: "italic",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                &ldquo; Kami berkomitmen untuk menghadirkan produk teknologi
                terbaik dengan pelayanan yang profesional dan terpercaya.
                &rdquo;
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "2px",
                    height: "32px",
                    background: "rgba(255,255,255,0.4)",
                    borderRadius: "2px",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 2px 0",
                    }}
                  >
                    Jeon Jungkook
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.5)",
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    CEO & Founder PT. Indo Bismar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "28px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "32px",
              border: `1px solid ${NAVY_BORDER}`,
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: NAVY,
                margin: "0 0 6px 0",
              }}
            >
              Kirim Pesan
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#9ca3af",
                margin: "0 0 24px 0",
              }}
            >
              Isi form di bawah dan kami akan segera menghubungi Anda.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                {[
                  {
                    label: "Nama Lengkap",
                    placeholder: "John Doe",
                    type: "text",
                  },
                  {
                    label: "Email",
                    placeholder: "john@email.com",
                    type: "email",
                  },
                ].map((f) => (
                  <div key={f.label}>
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#374151",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: `1px solid ${NAVY_BORDER}`,
                        fontSize: "13px",
                        outline: "none",
                        boxSizing: "border-box",
                        color: "#111827",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.border = `1px solid ${NAVY}`)
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.border = `1px solid ${NAVY_BORDER}`)
                      }
                    />
                  </div>
                ))}
              </div>
              <div>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  No. Telepon
                </label>
                <input
                  type="tel"
                  placeholder="+62 812-xxxx-xxxx"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: `1px solid ${NAVY_BORDER}`,
                    fontSize: "13px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.border = `1px solid ${NAVY}`)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.border = `1px solid ${NAVY_BORDER}`)
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Pesan
                </label>
                <textarea
                  placeholder="Tulis pesan Anda di sini..."
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: `1px solid ${NAVY_BORDER}`,
                    fontSize: "13px",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.border = `1px solid ${NAVY}`)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.border = `1px solid ${NAVY_BORDER}`)
                  }
                />
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "9px",
                  background: NAVY,
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = NAVY_LIGHT)
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}
              >
                Kirim Pesan
              </button>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "22px 24px",
                border: `1px solid ${NAVY_BORDER}`,
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: NAVY,
                  margin: "0 0 4px 0",
                }}
              >
                Follow Us
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  margin: "0 0 14px 0",
                }}
              >
                Klik icon untuk melihat info akun
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {socialLinks.map((sl) => (
                  <SocialIcon key={sl.label} sl={sl} size={44} iconSize={22} />
                ))}
              </div>
            </div>
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: `1px solid ${NAVY_BORDER}`,
                flex: 1,
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4!2d112.7!3d-7.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "260px" }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 3 — CABANG */}
        <div style={{ marginBottom: "60px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "28px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: NAVY,
                  textTransform: "uppercase",
                  margin: "0 0 7px 0",
                  opacity: 0.4,
                }}
              >
                Jaringan Kami
              </p>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: NAVY,
                  margin: 0,
                  letterSpacing: "-0.3px",
                }}
              >
                Cabang Kami
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: `1px solid ${NAVY_BORDER}`,
                borderRadius: "30px",
                padding: "7px 16px",
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 0 3px rgba(34,197,94,.2)",
                }}
              />
              <span
                style={{ fontSize: "12px", color: "#374151", fontWeight: 600 }}
              >
                {branches.length} Cabang Aktif
              </span>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            {branches.map((branch, i) => (
              <BranchCard
                key={i}
                branch={branch}
                index={i}
                onClick={() => setSelectedBranch(branch)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedBranch && (
        <div
          onClick={() => setSelectedBranch(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2,12,28,0.75)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "22px",
              width: "100%",
              maxWidth: "860px",
              overflow: "hidden",
              animation: "scaleIn .24s cubic-bezier(.34,1.3,.64,1) both",
              boxShadow: "0 32px 80px rgba(4,20,40,.45)",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                position: "relative",
                background: NAVY,
                padding: "20px 24px 16px",
                overflow: "hidden",
              }}
            >
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0.06,
                  pointerEvents: "none",
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="mDot"
                    x="0"
                    y="0"
                    width="18"
                    height="18"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="2" cy="2" r="1.4" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mDot)" />
              </svg>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "13px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "11px",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Building2
                      size={19}
                      style={{ color: "rgba(255,255,255,0.82)" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginBottom: "3px",
                        }}
                      >
                        <div
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: "#4ade80",
                            boxShadow: "0 0 0 3px rgba(74,222,128,0.2)",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "9px",
                            color: "rgba(255,255,255,0.5)",
                            fontWeight: 700,
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                          }}
                        >
                          Detail Cabang
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: "17px",
                          fontWeight: 800,
                          color: "#fff",
                          margin: 0,
                          letterSpacing: "-0.4px",
                        }}
                      >
                        {selectedBranch.name}
                      </h3>
                    </div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "30px",
                        padding: "4px 11px",
                      }}
                    >
                      <MapPin
                        size={9}
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      />
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.7)",
                          fontWeight: 600,
                        }}
                      >
                        {selectedBranch.city}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBranch(null)}
                  title="Tutup"
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    padding: 0,
                    lineHeight: 1,
                    transition: "background .15s, border-color .15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(239,68,68,0.7)";
                    e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1"
                      y1="1"
                      x2="10"
                      y2="10"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <line
                      x1="10"
                      y1="1"
                      x2="1"
                      y2="10"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* BODY */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.1fr",
                background: "#f8fafd",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  borderRight: "1px solid #eef1f6",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  {
                    icon: <MapPin size={13} />,
                    label: "Alamat",
                    value: selectedBranch.address,
                  },
                  {
                    icon: <Phone size={13} />,
                    label: "Telepon",
                    value: selectedBranch.phone,
                  },
                  {
                    icon: <Mail size={13} />,
                    label: "Email",
                    value: selectedBranch.email,
                  },
                  {
                    icon: <Clock size={13} />,
                    label: "Jam Operasional",
                    value: selectedBranch.hours,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "11px 14px",
                      background: "#fff",
                      borderRadius: "11px",
                      border: "1px solid #eef1f6",
                      boxShadow: "0 1px 3px rgba(7,43,80,0.04)",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#f0f4f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: NAVY,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div
                      style={{
                        width: "1px",
                        height: "28px",
                        background: "#eef1f6",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: "9px",
                          color: "#aab4c4",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.8px",
                          margin: "0 0 2px 0",
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          fontSize: "12.5px",
                          color: "#1e293b",
                          fontWeight: 600,
                          margin: 0,
                          lineHeight: 1.4,
                          wordBreak: "break-word",
                        }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "11px",
                    border: "1px solid #eef1f6",
                    padding: "11px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "2px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: NAVY,
                        margin: "0 0 1px 0",
                      }}
                    >
                      Ikuti Kami
                    </p>
                    <p
                      style={{ fontSize: "10px", color: "#94a3b8", margin: 0 }}
                    >
                      Klik untuk info akun
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "7px" }}>
                    {socialLinks.map((sl) => (
                      <SocialIcon
                        key={sl.label}
                        sl={sl}
                        size={34}
                        iconSize={17}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ position: "relative", minHeight: "380px" }}>
                <iframe
                  src={selectedBranch.maps}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    display: "block",
                    position: "absolute",
                    inset: 0,
                    minHeight: "380px",
                  }}
                  allowFullScreen
                  loading="lazy"
                  title={`Peta ${selectedBranch.name}`}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
