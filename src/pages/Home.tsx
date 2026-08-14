import { Hero } from "@/features/home/Hero";
import { CategoriesSection } from "@/features/home/CategoriesSection";
import { BenefitsBar } from "@/features/home/BenefitsBar";
import { PopularProducts } from "@/features/home/PopularProducts";

export function Home() {
  return (
    <div>
      <Hero />
      <CategoriesSection />
      <BenefitsBar />
      <PopularProducts />
    </div>
  );
}
