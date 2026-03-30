import Hero from "../components/Hero.jsx";
import CategorySection from "../components/CategorySection.jsx";
import PromoSection from "../components/PromoSection.jsx";
import HeroHighlight from "../components/HeroHighlight.jsx";
import NewProduct from "../components/NewProduct.jsx";
import TopProduct from "../components/TopProduct.jsx";
import BrandTersedia from "../components/BrandTersedia.jsx";
import PromoHariIni from "../components/PromoHariIni.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroHighlight />
      <CategorySection />
      <PromoHariIni />
      <PromoSection />
      <NewProduct />
      <TopProduct />
      <BrandTersedia />
    </>
  );
}
