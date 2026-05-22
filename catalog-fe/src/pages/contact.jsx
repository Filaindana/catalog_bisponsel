import { useState, useEffect, useRef } from "react";
import { sendKontak } from "../utils/services/contactService";
import { getSettings } from "../utils/services/settingsService";
import { getStatusBuka } from "../utils/getStatusBuka";
import { MapPin, Phone, Mail, Clock, ChevronRight, Building2, ExternalLink } from "lucide-react";
import { getSocialIcon } from "../utils/getSocialIcon";
import ceoImg from "../assets/ceo.jpg";

if (typeof document !== "undefined" && !document.querySelector("[data-font-bismar]")) {
  const s = document.createElement("style");
  s.setAttribute("data-font-bismar", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; font-family: 'Inter', sans-serif; }
    body, button, input, textarea, select { font-family: 'Inter', sans-serif; }
    @keyframes pulse2  { 0%,100%{opacity:1} 50%{opacity:.3} }
    @keyframes fadeUp  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
    @keyframes popIn   { from{opacity:0;transform:translateX(-50%) scale(.88)} to{opacity:1;transform:translateX(-50%) scale(1)} }
    .bcard { transition: transform .3s cubic-bezier(.34,1.3,.64,1), box-shadow .3s ease; }
    .bcard:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 28px 60px rgba(7,43,80,.14) !important; }
    .bcard:hover .bcard-img { transform: scale(1.08); }
    .bcard:hover .bcard-chevron { background: #072B50 !important; border-color: #072B50 !important; }
    .bcard:hover .bcard-chevron span, .bcard:hover .bcard-chevron svg { color: #fff !important; }
    .bcard:hover .bcard-name { color: #0a3460 !important; }
    .social-popup { animation: popIn .18s cubic-bezier(.34,1.56,.64,1) both; }
    .jam-accordion { animation: fadeUp .2s ease both; }
    .modal-wrap { animation: scaleIn .24s cubic-bezier(.34,1.3,.64,1) both; }
  `;
  document.head.appendChild(s);
}

/* ── Social Icons ── */
const FacebookIcon  = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24"><path fill="#fff" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>;
const InstagramIcon = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24"><path fill="#fff" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.645.07-4.849.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.157 3.355.673 1.965 2.063.573 3.453.157 5.195.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.858.501 3.6 1.893 4.99 1.39 1.39 3.132 1.808 4.99 1.893C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.858-.085 3.6-.501 4.99-1.893 1.392-1.39 1.808-3.132 1.893-4.99.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.085-1.858-.501-3.6-1.893-4.99C20.548.673 18.805.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const TikTokIcon    = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24"><path fill="#fff" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>;
const WhatsAppIcon  = ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24"><path fill="#fff" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.555 9.555 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 0C5.495 0 .16 5.335.157 11.892a11.85 11.85 0 0 0 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005C18.555 23.794 24 18.459 24 11.893A11.817 11.817 0 0 0 12.05 0zm0 21.785a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.825 9.825 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.889 9.884z"/></svg>;

const socialLinks = [
  { label:"Facebook",  username:"@BizPonselOfficial", desc:"Ikuti kami di Facebook untuk info terbaru",   href:"https://facebook.com/BizPonselOfficial",  bg:"#1877f2",                                                                                                              icon:(s)=><FacebookIcon size={s}/> },
  { label:"Instagram", username:"@bizponsel.id",      desc:"Lihat foto & promo terbaru kami",             href:"https://instagram.com/bizponsel.id",      bg:"radial-gradient(circle at 30% 110%, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", bgSolid:"#dc2743", icon:(s)=><InstagramIcon size={s}/> },
  { label:"TikTok",    username:"@bizponsel",         desc:"Tonton konten & review produk kami",          href:"https://tiktok.com/@bizponsel",           bg:"#010101",                                                                                                              icon:(s)=><TikTokIcon size={s}/> },
  { label:"WhatsApp",  username:"+62 811-3077-5195",  desc:"Chat langsung dengan tim kami",               href:"https://wa.me/6281130775195",             bg:"#25d366",                                                                                                              icon:(s)=><WhatsAppIcon size={s}/> },
];

/* ── SocialIcon with popup ── */
function SocialIcon({ sl, size = 44, iconSize = 22 }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const btnBg = sl.bgSolid || sl.bg;
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        title={sl.label}
        className="flex items-center justify-center rounded-[10px] border-none cursor-pointer p-0 shrink-0 transition-transform duration-150"
        style={{ width:`${size}px`, height:`${size}px`, background:sl.bg, boxShadow:"0 4px 12px rgba(0,0,0,0.25)", outline:open?"2.5px solid rgba(255,255,255,0.55)":"none", outlineOffset:"2px" }}
        onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,0.35)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.25)"; }}
      >
        {sl.icon(iconSize)}
      </button>
      {open && (
        <div className="social-popup absolute z-99 bg-white rounded-2xl p-4 border border-[#dce6f0] w-50"
          style={{ bottom:"calc(100% + 10px)", left:"50%", transform:"translateX(-50%)", boxShadow:"0 16px 48px rgba(7,43,80,0.18)" }}>
          {/* tail */}
          <div className="absolute w-3 h-3 bg-white border border-[#dce6f0] border-t-0 border-l-0"
            style={{ bottom:"-6px", left:"50%", transform:"translateX(-50%) rotate(45deg)" }} />
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex items-center justify-center rounded-lg shrink-0 w-7 h-7" style={{ background:sl.bg }}>
              {sl.icon(13)}
            </div>
            <span className="text-[13px] font-bold text-gray-900">{sl.label}</span>
          </div>
          <p className="text-[13px] font-bold text-[#072B50] mb-1">{sl.username}</p>
          <p className="text-[11px] text-gray-400 mb-3 leading-snug">{sl.desc}</p>
          <a href={sl.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-white text-xs font-bold no-underline"
            style={{ background:btnBg }}>
            Kunjungi <ExternalLink size={11} />
          </a>
        </div>
      )}
    </div>
  );
}

/* ── Data ── */
// const TEMP_ADDRESS = "Jl. Bendul Merisi Selatan XI No. 59-61, Kecamatan Wonocolo, Kota Surabaya.";
// const TEMP_MAPS = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.096!2d112.7452!3d-7.3118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0b5c5e5e5f%3A0x1234567890abcdef!2sJl.%20Bendul%20Merisi%20Selatan%20XI%2C%20Bendul%20Merisi%2C%20Kec.%20Wonocolo%2C%20Kota%20SBY%2C%20Jawa%20Timur%2060239!5e0!3m2!1sid!2sid!4v1";



/* ── Branch Card ── */
function BranchCard({ branch, index, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  const hasImg = branch.image && !imgErr;
  const accents = ["#1660b8","#0d4280","#0e5099","#163d6e","#0f4d90","#1a5fa8"];
  const accent = accents[index % accents.length];
  return (
    <div className="bcard cursor-pointer rounded-[18px] overflow-hidden bg-white flex flex-col"
      style={{ border:"1px solid #dce6f0", boxShadow:"0 2px 12px rgba(7,43,80,.07)" }}
      onClick={onClick}>
      {/* Image area */}
      <div className="relative overflow-hidden shrink-0 h-45">
        {hasImg ? (
          <img src={branch.image} alt={branch.name} onError={()=>setImgErr(true)}
            className="block object-cover w-full h-full bcard-img"
            style={{ transition:"transform .55s cubic-bezier(.25,.46,.45,.94)" }} />
        ) : (
          <div className="relative w-full h-full overflow-hidden"
            style={{ background:`linear-gradient(145deg, #072B50 0%, ${accent} 100%)` }}>
            <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id={`dot${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white"/></pattern></defs>
              <rect width="100%" height="100%" fill={`url(#dot${index})`}/>
            </svg>
            <span className="absolute -right-2 -bottom-4 text-[100px] font-black leading-none select-none" style={{ color:"rgba(255,255,255,0.06)" }}>
              {String(index+1).padStart(2,"0")}
            </span>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
              <div className="w-13 h-13 rounded-[14px] flex items-center justify-center"
                style={{ border:"1.5px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.08)" }}>
                <Building2 size={24} style={{ color:"rgba(255,255,255,0.55)" }} />
              </div>
              <span className="text-[10px] tracking-[2.5px] uppercase font-semibold" style={{ color:"rgba(255,255,255,0.35)" }}>Foto Segera Hadir</span>
            </div>
          </div>
        )}
        {/* gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background:"linear-gradient(to top, rgba(7,43,80,.7) 0%, transparent 100%)" }} />
        {/* city pill */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-white/95 rounded-full px-3 py-1.5"
          style={{ boxShadow:"0 2px 10px rgba(0,0,0,.18)" }}>
          <MapPin size={9} style={{ color:"#072B50" }} />
          <span className="text-[10px] font-bold tracking-[0.8px] uppercase" style={{ color:"#072B50" }}>{branch.city}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 pb-5.5">
        <p className="bcard-name text-[17px] font-bold mb-3.5 leading-snug" style={{ color:"#072B50" }}>
          {branch.name.replace("Cabang ","")}
        </p>
        <div className="flex items-center gap-2 mb-3.5">
          <div className="flex-1 h-px" style={{ background:"#dce6f0" }} />
        </div>
        <div className="flex flex-col gap-2.5 flex-1">
          {[
            { icon:<MapPin size={11}/>,  value:branch.address },
            { icon:<Phone  size={11}/>,  value:branch.phone   },
            { icon:<Mail   size={11}/>,  value:branch.email   },
            { icon:<Clock  size={11}/>,  value:branch.hours   },
          ].map((row,j) => (
            <div key={j} className="flex gap-2.5 items-start">
              <span className="shrink-0 mt-0.5" style={{ color:accent }}>{row.icon}</span>
              <span className="text-xs leading-[1.55]" style={{ color:"#5a6882" }}>{row.value}</span>
            </div>
          ))}
        </div>
        <div className="bcard-footer mt-4 pt-3.5 flex items-center justify-end" style={{ borderTop:"1px solid #dce6f0" }}>
          <div className="bcard-chevron flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200"
            style={{ background:"#f0f4f9", border:"1px solid #dce6f0" }}>
            <span className="text-[11px] font-semibold" style={{ color:"#072B50" }}>Detail</span>
            <ChevronRight size={12} style={{ color:"#072B50" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function Contact() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [now, setNow] = useState(new Date());
  const [jamOpen, setJamOpen] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    pesan: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await sendKontak(form);
      alert("Pesan berhasil dikirim!");

      setForm({
        nama: "",
        email: "",
        telepon: "",
        pesan: "",
      });
      console.log(res);
    } catch (err) {
      console.error(err);
      alert("Gagal kirim pesan");
    }
  };

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const bukaStatus = getStatusBuka(settings?.jam_operasional);
  const branchList = settings?.cabang ?? [];
  const socialLinksFromSettings = (settings?.social_media || []).map((item) => ({
    ...item,
    icon: (size) => {
      const Icon = getSocialIcon(item.label || item.platform || item.name);
      return <Icon size={size} />;
    },
  }));
  const contactCards = [
    {
      icon: <MapPin size={16} />,
      label: "Alamat",
      value: settings?.kontak?.alamat || "Alamat belum disetel",
    },
    {
      icon: <Phone size={16} />,
      label: "Telepon",
      value: settings?.kontak?.telepon || "Telepon belum disetel",
    },
    {
      icon: <Mail size={16} />,
      label: "Email",
      value: settings?.kontak?.email || "Email belum disetel",
    },
  ];

  useEffect(() => {
    const fetchSettings = async () => {
      setLoadingSettings(true);
      setLoadingError(null);

      try {
        const res = await getSettings();
        setSettings(res);
        setSelectedBranch(res?.cabang?.[0] ?? null);
      } catch (err) {
        console.error("Error fetch settings:", err);
        setLoadingError(err?.message || "Gagal memuat pengaturan.");
      } finally {
        setLoadingSettings(false);
      }
    };

    fetchSettings();
  }, []);

  const inp = "w-full px-3 py-2.5 rounded-lg text-[13px] text-gray-900 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#072B50]/10 focus:border-[#072B50]";
  const inpStyle = { border:"1px solid #dce6f0" };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">

      {/* HERO */}
      <div className="px-5 text-center bg-white md:px-10 py-14 md:py-16" style={{ borderBottom:"1px solid #dce6f0" }}>
        <h1 className="text-2xl md:text-[32px] font-extrabold mb-3 tracking-tight" style={{ color:"#072B50" }}>Contact us</h1>
        <p className="text-[15px] text-gray-500 mx-auto max-w-110 leading-[1.75]">
          Ada pertanyaan atau butuh bantuan? Kami siap membantu Anda.
        </p>
      </div>

      <div className="px-4 mx-auto max-w-350 md:px-10 py-7 pb-14">

        {/* BAGIAN 1 — Info Kontak + CEO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-9">

          {/* Informasi Kontak */}
          <div className="p-6 bg-white rounded-2xl md:p-8" style={{ border:"1px solid #dce6f0" }}>
            <h2 className="text-xl font-bold mb-1.5" style={{ color:"#072B50" }}>Informasi Kontak</h2>
            <p className="text-[13px] text-gray-400 mb-7 leading-relaxed">Jangan ragu untuk menghubungi kami kapan saja.</p>

            <div className="flex flex-col gap-4 mb-6">
              {contactCards.map((item,i) => (
                <div key={i} className="flex gap-3.5 items-start">
                  <div className="w-9.5 h-9.5 rounded-[9px] flex items-center justify-center text-white shrink-0 bg-[#072B50]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-[0.5px] mb-0.5">{item.label}</p>
                    <p className="text-[13px] font-semibold leading-snug text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Jam Operasional Accordion */}
            <div>
              <div
                onClick={() => setJamOpen(!jamOpen)}
                className="flex items-center justify-between px-4 py-3 transition-all duration-200 cursor-pointer"
                style={{
                  background:"#f0f4f9",
                  borderRadius: jamOpen ? "10px 10px 0 0" : "10px",
                  border:`1px solid ${jamOpen ? "#072B50" : "#dce6f0"}`,
                  borderBottom: jamOpen ? "1px solid #dce6f0" : undefined,
                }}>
                <div className="flex gap-2.5 items-center">
                  <Clock size={15} style={{ color:"#072B50" }} />
                  <div>
                    <p className="text-[11px] text-gray-500 font-semibold m-0">Jam Operasional</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.25 h-1.25 rounded-full" style={{ background:bukaStatus.buka?"#22c55e":"#9ca3af", animation:bukaStatus.buka?"pulse2 2s infinite":"none" }} />
                      <p className="text-[11px] font-semibold m-0" style={{ color:bukaStatus.buka?"#15803d":"#9ca3af" }}>
                        {bukaStatus.label}
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ transform:jamOpen?"rotate(90deg)":"rotate(0deg)", transition:"transform .25s" }}>
                  <ChevronRight size={14} style={{ color:"#072B50" }} />
                </div>
              </div>

              {jamOpen && (
                <div className="overflow-hidden jam-accordion" style={{ border:"1px solid #072B50", borderTop:"none", borderRadius:"0 0 10px 10px" }}>
                  <div className="grid grid-cols-2">
                    {/* Jam Kerja Pusat */}
                    <div style={{ borderRight:"1px solid #dce6f0" }}>
                      <p className="text-[10px] font-bold text-[#072B50] opacity-40 tracking-[1.5px] uppercase m-0 px-3.5 pt-2.5 pb-1.5" style={{ borderBottom:"1px solid #dce6f0" }}>Jam Kerja Pusat</p>
                      {[
                        { label: "Senin – Jumat", value: settings?.jam_operasional?.pusat ? `${settings.jam_operasional.pusat.senin_jumat.buka} – ${settings.jam_operasional.pusat.senin_jumat.tutup}` : "Belum disetel", libur: settings?.jam_operasional?.pusat?.senin_jumat?.libur },
                        { label: "Sabtu", value: settings?.jam_operasional?.pusat ? `${settings.jam_operasional.pusat.sabtu.buka} – ${settings.jam_operasional.pusat.sabtu.tutup}` : "Belum disetel", libur: settings?.jam_operasional?.pusat?.sabtu?.libur },
                        { label: "Minggu & Nasional", value: "Libur", libur: true },
                      ].map((row,i,arr) => (
                        <div key={i} className="flex justify-between items-center px-3.5 py-2.5 bg-white" style={{ borderBottom:i<arr.length-1?"1px solid #dce6f0":"none" }}>
                          <span className="text-xs" style={{ color:row.libur?"#9ca3af":"#374151" }}>{row.label}</span>
                          <span className="text-xs font-bold" style={{ color:row.libur?"#9ca3af":"#072B50" }}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                    {/* Jam Shift Cabang */}
                    <div>
                      <p className="text-[10px] font-bold text-[#072B50] opacity-40 tracking-[1.5px] uppercase m-0 px-3.5 pt-2.5 pb-1.5" style={{ borderBottom:"1px solid #dce6f0" }}>Jam Shift Cabang</p>
                      {settings?.jam_operasional?.cabang?.map((row,i,arr) => (
                        <div key={i} className="px-3.5 py-2.5 bg-white" style={{ borderBottom:i<arr.length-1?"1px solid #dce6f0":"none" }}>
                          <p className="text-[10px] font-bold text-[#072B50] opacity-50 uppercase tracking-[0.5px] mb-1.5">{row.nama}</p>
                          <div className="flex gap-1.5">
                            {[row.shift1, row.shift2].map((sh,j) => (
                              <div key={j} className="flex-1 px-2 py-1.5 rounded-md" style={{ background:"#f0f4f9", border:"1px solid #dce6f0" }}>
                                <p className="text-[9px] text-gray-400 font-semibold mb-0.5">Shift {j+1}</p>
                                <p className="text-[11px] font-bold text-[#072B50] m-0">{sh}</p>
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

          {/* CEO Photo */}
          <div className="relative overflow-hidden rounded-2xl min-h-80 lg:min-h-100" style={{ border:"1px solid #dce6f0" }}>
            <img src={ceoImg} alt="CEO" className="absolute inset-0 object-contain object-top w-full h-full" />
            <div className="absolute inset-0" style={{ background:"linear-gradient(to top, #072B50 38%, transparent 100%)" }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[13px] italic font-light leading-[1.8] mb-3.5" style={{ color:"rgba(255,255,255,0.8)" }}>
                &ldquo; Kami berkomitmen untuk menghadirkan produk teknologi terbaik dengan pelayanan yang profesional dan terpercaya. &rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-0.5 h-8 rounded-full" style={{ background:"rgba(255,255,255,0.4)" }} />
                <div>
                  <p className="text-[14px] font-bold text-white mb-0.5">Jeon Jungkook</p>
                  <p className="text-[11px] font-medium m-0" style={{ color:"rgba(255,255,255,0.5)" }}>CEO & Founder PT. Indo Bismar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 2 — Form + Sosmed & Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-7 mb-9">

          {/* Form */}
          <div className="p-6 bg-white rounded-2xl md:p-8" style={{ border:"1px solid #dce6f0" }}>
            <h2 className="text-xl font-bold mb-1.5" style={{ color:"#072B50" }}>Kirim Pesan</h2>
            <p className="text-[13px] text-gray-400 mb-6">Isi form di bawah dan kami akan segera menghubungi Anda.</p>
            <div className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[{ label:"Nama Lengkap", placeholder:"John Doe", type:"text" }, { label:"Email", placeholder:"john@email.com", type:"email" }].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      name={f.label === "Nama Lengkap" ? "nama" : "email"}
                      value={f.label === "Nama Lengkap" ? form.nama : form.email}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className={inp}
                      style={inpStyle}
                      onFocus={e=>(e.currentTarget.style.border="1px solid #072B50")}
                      onBlur={e=>(e.currentTarget.style.border="1px solid #dce6f0")}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">No. Telepon</label>
                <input
                  type="tel"
                  name="telepon"
                  value={form.telepon}
                  onChange={handleChange}
                  placeholder="+62 812-xxxx-xxxx"
                  className={inp}
                  style={inpStyle}
                  onFocus={e=>(e.currentTarget.style.border="1px solid #072B50")}
                  onBlur={e=>(e.currentTarget.style.border="1px solid #dce6f0")}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pesan</label>
                <textarea
                  name="pesan"
                  value={form.pesan}
                  onChange={handleChange}
                  placeholder="Tulis pesan Anda di sini..."
                  rows={5}
                  className={inp + " resize-y"}
                  style={{ ...inpStyle, fontFamily:"inherit" }}
                  onFocus={e=>(e.currentTarget.style.border="1px solid #072B50")}
                  onBlur={e=>(e.currentTarget.style.border="1px solid #dce6f0")}
                />
              </div>
              <button onClick={handleSubmit} className="w-full py-3 rounded-[9px] text-white text-[13px] font-bold border-none cursor-pointer transition-colors duration-200 bg-[#072B50] hover:bg-[#0a3460]">
                Kirim Pesan
              </button>
            </div>
          </div>

          {/* Sosmed + Maps */}
          <div className="flex flex-col gap-4">
            <div className="px-6 py-5 bg-white rounded-2xl" style={{ border:"1px solid #dce6f0" }}>
              <h3 className="mb-1 text-xl font-bold" style={{ color:"#072B50" }}>Follow Us</h3>
              <p className="text-xs text-gray-400 mb-3.5">Klik icon untuk melihat info akun</p>
              <div className="flex gap-2.5">
                {socialLinks.map(sl => <SocialIcon key={sl.label} sl={sl} size={44} iconSize={22} />)}
              </div>
            </div>
            <div className="flex-1 overflow-hidden rounded-2xl" style={{ border:"1px solid #dce6f0" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4!2d112.7!3d-7.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMDAuMCJTIDExMsKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1"
                width="100%" height="100%" className="block min-h-65" style={{ border:0 }} allowFullScreen loading="lazy" />
            </div>
          </div>
        </div>

        {/* BAGIAN 3 — Cabang */}
        <div className="mb-14">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-7">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider opacity-40 mb-1.5" style={{ color:"#072B50" }}>Jaringan Kami</p>
              <h2 className="text-[28px] font-extrabold tracking-tight m-0" style={{ color:"#072B50" }}>Cabang Kami</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full px-4 py-1.5 bg-white" style={{ border:"1px solid #dce6f0" }}>
              <div className="w-1.75 h-1.75 rounded-full bg-green-500" style={{ boxShadow:"0 0 0 3px rgba(34,197,94,.2)" }} />
              <span className="text-xs font-semibold text-gray-700">{branchList.length} Cabang Aktif</span>
            </div>
          </div>
          {loadingSettings ? (
            <p className="text-sm text-gray-500">Loading cabang...</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {branchList.map((branch,i) => (
                <BranchCard
                  key={branch.id || i}
                  branch={branch}
                  index={i}
                  onClick={() => setSelectedBranch(branch)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {selectedBranch && (
        <div
          onClick={() => setSelectedBranch(null)}
          className="fixed inset-0 flex items-center justify-center p-4 z-1000"
          style={{ background:"rgba(2,12,28,0.75)", backdropFilter:"blur(10px)" }}>
          <div
            onClick={e => e.stopPropagation()}
            className="modal-wrap bg-white rounded-[22px] w-full overflow-hidden"
            style={{ maxWidth:"860px", boxShadow:"0 32px 80px rgba(4,20,40,.45)" }}>

            {/* Modal Header */}
            <div className="relative bg-[#072B50] px-6 py-5 overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="mDot" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="white"/></pattern></defs>
                <rect width="100%" height="100%" fill="url(#mDot)"/>
              </svg>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[11px] flex items-center justify-center shrink-0"
                    style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.18)" }}>
                    <Building2 size={19} style={{ color:"rgba(255,255,255,0.82)" }} />
                  </div>
                  <div className="flex items-center gap-3.5">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div className="w-1.25 h-1.25 rounded-full bg-green-400" style={{ boxShadow:"0 0 0 3px rgba(74,222,128,0.2)" }} />
                        <span className="text-[9px] font-bold tracking-[2px] uppercase" style={{ color:"rgba(255,255,255,0.5)" }}>Detail Cabang</span>
                      </div>
                      <h3 className="text-[17px] font-extrabold text-white m-0 tracking-tight">{selectedBranch.name}</h3>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                      style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)" }}>
                      <MapPin size={9} style={{ color:"rgba(255,255,255,0.6)" }} />
                      <span className="text-[10px] font-semibold" style={{ color:"rgba(255,255,255,0.7)" }}>{selectedBranch.city}</span>
                    </div>
                  </div>
                </div>
                {/* Close btn */}
                <button
                  onClick={() => setSelectedBranch(null)}
                  className="w-6.5 h-6.5 rounded-md flex items-center justify-center shrink-0 cursor-pointer transition-all duration-150"
                  style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(239,68,68,0.7)"; e.currentTarget.style.borderColor="rgba(239,68,68,0.4)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <line x1="1" y1="1" x2="10" y2="10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="10" y1="1" x2="1" y2="10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] bg-[#f8fafd]">
              {/* Info kolom kiri */}
              <div className="p-5 flex flex-col gap-2.5" style={{ borderRight:"1px solid #eef1f6" }}>
                {[
                  { icon:<MapPin size={13}/>, label:"Alamat",         value:selectedBranch.address },
                  { icon:<Phone  size={13}/>, label:"Telepon",         value:selectedBranch.phone   },
                  { icon:<Mail   size={13}/>, label:"Email",           value:selectedBranch.email   },
                  { icon:<Clock  size={13}/>, label:"Jam Operasional", value:selectedBranch.hours   },
                ].map((item,i) => (
                  <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 bg-white rounded-[11px]" style={{ border:"1px solid #eef1f6", boxShadow:"0 1px 3px rgba(7,43,80,0.04)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#f0f4f9] text-[#072B50]">{item.icon}</div>
                    <div className="w-px h-7 shrink-0 bg-[#eef1f6]" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-[#aab4c4] font-bold uppercase tracking-[0.8px] mb-0.5">{item.label}</p>
                      <p className="text-[12.5px] text-[#1e293b] font-semibold leading-snug wrap-break-word m-0">{item.value}</p>
                    </div>
                  </div>
                ))}
                {/* Sosmed row */}
                <div className="bg-white rounded-[11px] px-3.5 py-2.5 flex items-center justify-between" style={{ border:"1px solid #eef1f6" }}>
                  <div>
                    <p className="text-[11px] font-bold text-[#072B50] mb-0.5">Ikuti Kami</p>
                    <p className="text-[10px] text-[#94a3b8] m-0">Klik untuk info akun</p>
                  </div>
                  <div className="flex gap-1.5">
                    {(socialLinksFromSettings.length ? socialLinksFromSettings : socialLinks).map((sl) => (
                      <SocialIcon key={sl.label || sl.name || sl.platform} sl={sl} size={34} iconSize={17} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Maps kolom kanan */}
              <div className="relative min-h-80 md:min-h-95">
                <iframe src={selectedBranch.maps} width="100%" height="100%"
                  className="absolute inset-0 block min-h-95"
                  style={{ border:0 }} allowFullScreen loading="lazy"
                  title={`Peta ${selectedBranch.name}`} referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}