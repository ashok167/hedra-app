import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import Catalog from "@/pages/Catalog";
import ChairCatalog from "@/pages/ChairCatalog";

export default function ProductCategory() {
  const [activeTab, setActiveTab] = useState<"dynamic" | "static">("dynamic");

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f8fa]">
        {/* Hero Section */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold text-[#14294C]">
              Choose Your Catalogue Experience
            </h1>

            <p className="mt-3 text-gray-500">
              Select your preferred catalogue browsing experience.
            </p>

       <div className="mt-10 flex justify-center gap-5">
  <Button
    onClick={() => setActiveTab("dynamic")}
    className="w-56 h-11 rounded-lg font-semibold !bg-[#143B67] !text-white border-[#143B67] hover:!bg-[#143B67] hover:!text-white"
  >
    Dynamic Catalogue
  </Button>

  <Button
    onClick={() => setActiveTab("static")}
    className="w-56 h-11 rounded-lg font-semibold !bg-[#F58220] !text-white border-[#F58220] hover:!bg-[#F58220] hover:!text-white"
  >
    Static Catalogue
  </Button>
</div>
          </div>
        </section>

        {/* Catalogue Content */}
      <div className="mt-0">
          {activeTab === "dynamic" ? (
            <Catalog />
          ) : (
            <ChairCatalog />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}