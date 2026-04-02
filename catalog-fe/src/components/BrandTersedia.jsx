import acerImg      from "../assets/acer.png";
import appleImg     from "../assets/apple.png";
import asusImg      from "../assets/asus.png";
import axiooImg     from "../assets/axioo.png";
import dellImg      from "../assets/dell.png";
import fantechImg   from "../assets/fantech.png";
import hpImg        from "../assets/hp.png";
import huaweiImg    from "../assets/huawei.png";
import legitechImg  from "../assets/legitech.png";
import lenovoImg    from "../assets/lenovo.png";
import microsoftImg from "../assets/microsoft.png";
import msiImg       from "../assets/msi.png";
import oneplusImg   from "../assets/oneplus.png";
import oppoImg      from "../assets/oppo.png";
import pixelImg     from "../assets/pixel.png";
import pocoImg      from "../assets/poco.png";
import realmeImg    from "../assets/realme.png";
import rogImg       from "../assets/rog.png";
import samsungImg   from "../assets/samsung.png";
import vivoImg      from "../assets/vivo.png";
import xiaomiImg    from "../assets/xiaomi.png";
import tecnoImg     from "../assets/tecno.png";

const brands = [
  { name: "ASUS",      image: asusImg },
  { name: "Apple",     image: appleImg },
  { name: "Lenovo",    image: lenovoImg },
  { name: "HP",        image: hpImg },
  { name: "Dell",      image: dellImg },
  { name: "Acer",      image: acerImg },
  { name: "Axioo",     image: axiooImg },
  { name: "Pixel",     image: pixelImg },
  { name: "Samsung",   image: samsungImg },
  { name: "MSI",       image: msiImg },
  { name: "Microsoft", image: microsoftImg },
  { name: "OnePlus",   image: oneplusImg },
  { name: "Xiaomi",    image: xiaomiImg },
  { name: "Vivo",      image: vivoImg },
  { name: "OPPO",      image: oppoImg },
  { name: "POCO",      image: pocoImg },
  { name: "Logitech",  image: legitechImg },
  { name: "ROG",       image: rogImg },
  { name: "Huawei",    image: huaweiImg },
  { name: "Fantech",   image: fantechImg },
  { name: "Realme",    image: realmeImg },
  { name: "Tecno",     image: tecnoImg },
];

export default function BrandSection() {
  return (
    <section style={{ padding: "50px 0", background: "#ffffff" }}>
      <h2 className="section-title" style={{ textAlign: "center", marginBottom: 32 }}>Brand Tersedia</h2>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px 32px", maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
        {brands.map((brand, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s ease", filter: "grayscale(30%)", opacity: 0.85 }}
            onMouseEnter={e => { e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.filter = "grayscale(30%)"; e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <img src={brand.image} alt={brand.name} style={{ height: 36, width: "auto", maxWidth: 100, objectFit: "contain" }} />
          </div>
        ))}
      </div>
    </section>
  );
}
