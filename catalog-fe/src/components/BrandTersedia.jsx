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

export default function BrandSection() {
  return (
    <section className="py-10 md:py-12.5 bg-white">
      
      <h2 className="mb-6 text-center section-title md:mb-8">
        Brand Tersedia
      </h2>

      <div className="grid grid-cols-3 px-4 mx-auto  max-w-250 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-6 gap-x-4 sm:gap-x-6">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex items-center justify-center transition-all duration-300 cursor-pointer  opacity-90 hover:opacity-100 hover:scale-110 active:scale-95"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="h-7 sm:h-8 md:h-9 object-contain max-w-22.5"
            />
          </div>
        ))}
      </div>

    </section>
  );
}