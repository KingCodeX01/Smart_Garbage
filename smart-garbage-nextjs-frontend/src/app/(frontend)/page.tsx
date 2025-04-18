import React from "react";
import Hero from "@/components/hero";
import About from "@/components/aboutus/whyus";
import Workflow from "@/components/workflow/workflow";
import ProductCard from "@/components/ui/productCard";
import Bought from "@/components/bought/Bought";

const Page = () => {
  return (
    <>
      <div id={"hero"}>
        <Hero />
      </div>
      <div className="px-16 max-md:px-6">
        <div id={"about"} className={"w-full py-10"}>
          <About />
        </div>
        <div id={"workflow"}>
          <Workflow />
        </div>

        <div id={"Bought"}>
          <Bought />
        </div>
      </div>
      <div className={"main_padding"} id={"products"}>
        <div className={"text-2xl text-center font-semibold py-2"}>
          Refurbished Products
        </div>
        <div className={"grid grid-cols-4 max-md:grid-cols-2 gap-x-3"}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </>
  );
};

export default Page;
