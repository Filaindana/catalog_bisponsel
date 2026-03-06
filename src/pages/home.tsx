import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import PromoSection from "../components/PromoSection";
import HeroHighlight from "../components/HeroHighlight";
import NewProduct from "../components/NewProduct";
import TopProduct from "../components/TopProduct";
import BrandTersedia from "../components/BrandTersedia";
import PromoHariIni from "../components/PromoHariIni";

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
