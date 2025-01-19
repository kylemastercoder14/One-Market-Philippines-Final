import React from "react";
import Banner from "./_components/banner";
import Notice from "./_components/notice";
import { ChevronRight, ZapIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import FlashDealsSection from "./_components/flash-deals-section";
import FeaturedStore from "./_components/featured-store";
import HeaderDesign from "../../components/globals/header-design";
import CategoriesSection from "./_components/categories-section";
import CategoryCarousel from "./_components/category-carousel";
import ProductsGrid from "./_components/products-grid";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Banner />
      <main className="px-[200px] pb-20 pt-10">
        <Notice />
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ZapIcon className="w-6 h-6" />
              <h3 className="text-2xl font-semibold">Flash Deals</h3>
            </div>
            <Link href="#" className="flex items-center hover:underline gap-2">
              <span>Limited time offer</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <FlashDealsSection />
        </section>
        <section className="mt-10">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-20">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <HeaderDesign />
                  <h3 className="text-orange-600 font-black text-2xl font-costaBold">
                    Featured Stores
                  </h3>
                  <HeaderDesign />
                </div>
                <Link
                  href="#"
                  className="flex items-center hover:underline gap-2"
                >
                  <span>See more</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <FeaturedStore />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <HeaderDesign />
                  <h3 className="text-orange-600 font-black text-2xl font-costaBold">
                    Categories
                  </h3>
                  <HeaderDesign />
                </div>
                <Link
                  href="#"
                  className="flex items-center hover:underline gap-2"
                >
                  <span>See more</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <CategoriesSection />
            </div>
          </div>
        </section>
        <section className="mt-10">
          <div className="flex justify-center items-center gap-4">
            <HeaderDesign />
            <h3 className="text-orange-600 font-black text-2xl font-costaBold">
              EXPLORE YOUR INTERESTS
            </h3>
            <HeaderDesign />
          </div>
          <CategoryCarousel />
          <ProductsGrid />
          <Button
            size="lg"
            className="mt-5 w-[200px] text-lg rounded-full font-bold flex items-center text-center justify-center mx-auto"
          >
            See More <ChevronDown className="w-5 h-5" />
          </Button>
        </section>
      </main>
    </>
  );
}
