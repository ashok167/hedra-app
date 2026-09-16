// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";

// import Catalog from "@/pages/Catalog";
// import ChairCatalog from "@/pages/ChairCatalog";

// export default function ProductCategory() {
//   const [activeTab, setActiveTab] = useState<"dynamic" | "static">("dynamic");

//   return (
//     <>
//       <Header />

//       <main className="min-h-screen bg-[#f8f8fa]">
//         {/* Hero Section */}
//         <section className="bg-white border-b">
//           <div className="container mx-auto px-4 py-16 text-center">
//             <h1 className="text-4xl font-bold text-[#14294C]">
//               Choose Your Catalogue Experience
//             </h1>

//             <p className="mt-3 text-gray-500">
//               Select your preferred catalogue browsing experience.
//             </p>

//        <div className="mt-10 flex justify-center gap-5">
//   <Button
//     onClick={() => setActiveTab("dynamic")}
//     className="w-56 h-11 rounded-lg font-semibold !bg-[#143B67] !text-white border-[#143B67] hover:!bg-[#143B67] hover:!text-white"
//   >
//     Dynamic Catalogue
//   </Button>

//   <Button
//     onClick={() => setActiveTab("static")}
//     className="w-56 h-11 rounded-lg font-semibold !bg-[#F58220] !text-white border-[#F58220] hover:!bg-[#F58220] hover:!text-white"
//   >
//     Static Catalogue
//   </Button>
// </div>
//           </div>
//         </section>

//         {/* Catalogue Content */}
//       <div className="mt-0">
//           {activeTab === "dynamic" ? (
//             <Catalog />
//           ) : (
//             <ChairCatalog />
//           )}
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }





import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import Catalog from "@/pages/Catalog";
import ChairCatalog from "@/pages/ChairCatalog";

export default function ProductCategory() {
  const [activeTab, setActiveTab] = useState<"dynamic" | "static">("dynamic");

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#fafbfc]">
        {/* Hero Section */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-16 text-center">

            <h1 className="text-4xl font-bold text-[#14294C]">
              Choose Your Catalogue Experience
            </h1>

            <p className="mt-3 text-gray-500">
              Select your preferred catalogue browsing experience.
            </p>

            {/* Glass Catalogue Cards */}
            <div className="mt-10 flex justify-center gap-5">

              {/* Dynamic Catalogue */}
              <button
                type="button"
                onClick={() => setActiveTab("dynamic")}
                className={`
                  group relative w-72 min-h-[228px]
                  overflow-hidden rounded-xl
                  border p-4 text-left
                  backdrop-blur-md
                  transition-all duration-300
                  ${
                    activeTab === "dynamic"
                      ? "border-[#9ccfff] shadow-[0_12px_35px_rgba(20,59,103,0.16)]"
                      : "border-[#cfe5fa] shadow-[0_8px_25px_rgba(20,59,103,0.10)] hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(20,59,103,0.16)]"
                  }
                `}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(227,241,253,0.92), rgba(242,248,253,0.78))",
                }}
              >
                {/* Glass decoration */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#c5e3ff]/40 blur-[1px]" />

                <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-[#d9edff]/50" />

                <div className="relative z-10">
                  <h2 className="text-sm font-semibold text-[#143B67]">
                    Dynamic Catalogue
                  </h2>

                  <p className="mt-5 text-xs leading-5 text-gray-600 font-normal">
                    This catalogue is automatically generated using the
                    products currently listed online and is updated regularly
                    as new products and studio photography become available.
                  </p>

                  <p className="mt-4 text-xs leading-5 text-gray-600 font-normal">
                    You can also download the latest version at any time.
                  </p>
                </div>
              </button>

              {/* Static Catalogue */}
              <button
                type="button"
                onClick={() => setActiveTab("static")}
                className={`
                  group relative w-72 min-h-[228px]
                  overflow-hidden rounded-xl
                  border p-4 text-left
                  backdrop-blur-md
                  transition-all duration-300
                  ${
                    activeTab === "static"
                      ? "border-[#ffd0a8] shadow-[0_12px_35px_rgba(245,130,32,0.16)]"
                      : "border-[#f8dcc5] shadow-[0_8px_25px_rgba(245,130,32,0.10)] hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(245,130,32,0.16)]"
                  }
                `}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,246,238,0.95), rgba(255,250,246,0.80))",
                }}
              >
                {/* Glass decoration */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#ffdcbf]/45 blur-[1px]" />

                <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-[#ffe8d5]/50" />

                <div className="relative z-10">
                  <h2 className="text-sm font-semibold text-[#F58220]">
                    Static Catalogue
                  </h2>

                  <p className="mt-5 text-xs leading-5 text-gray-600 font-normal">
                    Explore our professionally curated catalogues, designed
                    and published periodically.
                  </p>

                  <p className="mt-4 text-xs leading-5 text-gray-600 font-normal">
                    These catalogues showcase selected collections, featured
                    products, and design inspiration in a polished brochure
                    format, making them ideal for browsing or sharing.
                  </p>
                </div>
              </button>

            </div>
          </div>
        </section>

        {/* Catalogue Content */}
        <div className="mt-0">
          {activeTab === "dynamic" ? <Catalog /> : <ChairCatalog />}
        </div>
      </main>

      <Footer />
    </>
  );
}