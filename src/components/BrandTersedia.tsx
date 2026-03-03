import acerImg from "../assets/acer.png";
import appleImg from "../assets/apple.png";
import asusImg from "../assets/asus.png";
import axiooImg from "../assets/axioo.png";
import dellImg from "../assets/dell.png";
import fantechImg from "../assets/fantech.png";
import hpImg from "../assets/hp.png";
import huaweiImg from "../assets/huawei.png";
import legitechImg from "../assets/legitech.png";
import lenovoImg from "../assets/lenovo.png";
import microsoftImg from "../assets/microsoft.png";
import msiImg from "../assets/msi.png";
import oneplusImg from "../assets/oneplus.png";
import oppoImg from "../assets/oppo.png";
import pixelImg from "../assets/pixel.png";
import pocoImg from "../assets/poco.png";
import realmeImg from "../assets/realme.png";
import rogImg from "../assets/rog.png";
import samsungImg from "../assets/samsung.png";
import vivoImg from "../assets/vivo.png";
import xiaomiImg from "../assets/xiaomi.png";
import tecnoImg from "../assets/tecno.png";

const brands = [
  { name: "ASUS", image: asusImg },
  { name: "Apple", image: appleImg },
  { name: "Lenovo", image: lenovoImg },
  { name: "HP", image: hpImg },
  { name: "Dell", image: dellImg },
  { name: "Acer", image: acerImg },
  { name: "Axioo", image: axiooImg },
  { name: "Pixel", image: pixelImg },
  { name: "Samsung", image: samsungImg },
  { name: "MSI", image: msiImg },
  { name: "Microsoft", image: microsoftImg },
  { name: "OnePlus", image: oneplusImg },
  { name: "Xiaomi", image: xiaomiImg },
  { name: "Vivo", image: vivoImg },
  { name: "OPPO", image: oppoImg },
  { name: "POCO", image: pocoImg },
  { name: "Logitech", image: legitechImg },
  { name: "ROG", image: rogImg },
  { name: "Huawei", image: huaweiImg },
  { name: "Fantech", image: fantechImg },
  { name: "Realme", image: realmeImg },
  { name: "Tecno", image: tecnoImg },
];

const brandStyles = `
  .brand-section {
    padding: 50px 0;
    background: #ffffff;
  }
  .brand-title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 32px;
  }
  .brand-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px 32px;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .brand-item {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    filter: grayscale(30%);
    opacity: 0.85;
  }
  .brand-item:hover {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.08);
  }
  .brand-item img {
    height: 36px;
    width: auto;
    max-width: 100px;
    object-fit: contain;
  }
`;

export default function BrandSection() {
  return (
    <section className="brand-section">
      <style>{brandStyles}</style>

      <p className="brand-title">Brand Tersedia</p>

      <div className="brand-grid">
        {brands.map((brand, index) => (
          <div key={index} className="brand-item">
            <img src={brand.image} alt={brand.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
