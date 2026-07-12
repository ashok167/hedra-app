// // src/pages/CategoryProducts.tsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { apiGetRequest } from "../../service.tsx";
// import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl?: string | string[];
//   category: string;
// };

// // -------------- helpers --------------
// const firstImageFrom = (img?: string | string[]) => {
//   if (!img) return undefined;
//   if (Array.isArray(img)) return img[0];
//   try {
//     const parsed = JSON.parse(img);
//     if (Array.isArray(parsed) && parsed.length) return String(parsed[0]);
//   } catch {}
//   const first = img.split(/[,;\s]+/).find(Boolean);
//   return first;
// };

// // Parent → subcategories (labels & slugs are static; thumbnails are fetched)
// const SUBCATEGORY_MAP: Record<
//   string,
//   { value: string; label: string }[]
// > = {
//   // SOFA
//   "sofa": [
//   { value: "sofa",               label: "All Sofas" },
//   { value: "sofa-1-seater",      label: "Single Seater" },
//   { value: "sofa-2-seater",      label: "Two-Seater Sofas" },
//   { value: "sofa-3-seater",      label: "Three-Seater Sofas" },
//   { value: "sofa-4-seater-plus", label: "Four-Seater Sofas" },
//   { value: "sofa-5-seater",      label: "Five-Seater Sofas" },
//   { value: "sofa-6-plus",        label: "Six-Seater & More" },
//   { value: "sofa-corner",        label: "Corner Sofas" },
//   { value: "sofa-sectional",     label: "Sectional Sofas" },
//   { value: "sofa-modular",       label: "Modular Sofas" },
//   { value: "sofa-lounge",        label: "Lounge Sofas" },
//   { value: "sofa-recliner",      label: "Recliner Sofas" },
//   { value: "sofa-chairs",        label: "Sofa Chairs" },
//   { value: "sofa-outdoor",       label: "Outdoor Sofas" },
//   { value: "sofa-new",           label: "New Launches" },
//   { value: "sofa-best-sellers",  label: "Best Sellers" },
// ],

//   // CENTER TABLES
//  "coffee-tables": [
//   { value: "coffee-tables", label: "All Tables" },
//   { value: "coffee-tables-rectangular-square", label: "Rectangular & Square Tables" },
//   { value: "coffee-tables-oval-circular", label: "Oval & Circular Tables" },
//   { value: "coffee-tables-storage", label: "Coffee Tables with Storage" },
//   { value: "coffee-tables-modern", label: "Modern Tables" },
//   { value: "coffee-tables-new", label: "New Launches" },
// ],

//   // BEDS
//   "bed": [
//   { value: "bed", label: "All Beds" },
//   { value: "bed-upholstered", label: "Upholstered Beds" },
//   { value: "bed-wooden", label: "Wooden Beds" },
//   { value: "bed-premium", label: "Premium Models" },
//   { value: "bed-storage", label: "Beds with Storage" },
//   { value: "bed-stools", label: "Bedroom Stools" },
//   { value: "bed-bench", label: "Bedroom Bench" },
//   { value: "bed-makeup-chairs", label: "Makeup Chairs" },
//   { value: "bed-new", label: "New Launches" },
//   { value: "bed-best-sellers", label: "Best Sellers" },
// ],

// // OTTOMANS
// "ottomans": [
//   { value: "ottomans", label: "All Ottomans & Benches" },
//   { value: "ottomans-poufs", label: "Poufs" },
//   { value: "ottomans-upholstered", label: "Upholstered Ottomans" },
//   { value: "ottomans-benches", label: "Benches" },
//   { value: "ottomans-bench-storage", label: "Bench with Storage" },
//   { value: "ottomans-bedroom", label: "Bedroom Ottomans" },
//   { value: "ottomans-foot-stools", label: "Foot Stools" },
//   { value: "ottomans-new", label: "New Launches" },
//   { value: "ottomans-best-sellers", label: "Best Sellers" },
// ],

//   // DINING TABLES
//   "dining-table": [
//   { value: "dining-table", label: "All Dining Tables" },
//   { value: "dining-table-rectangular", label: "Rectangular" },
//   { value: "dining-table-circular", label: "Circular" },
//   { value: "dining-table-oval", label: "Oval" },
// ],
// // CHAIRS
// "chairs": [
//   { value: "chairs", label: "All Chairs & Stools" },
//   { value: "chairs-dining", label: "Dining Chairs" },
//   { value: "chairs-study", label: "Study Chairs" },
//   { value: "chairs-sofa", label: "Sofa Chairs" },
//   { value: "chairs-swivel", label: "Swivel Chairs" },
//   { value: "chairs-lounge", label: "Lounge Chairs" },
//   { value: "chairs-makeup", label: "Makeup Chairs" },
//   { value: "chairs-bar-stools", label: "Bar Stools" },
// ],


// // OFFICE TABLES
// "office-tables": [
//   { value: "office-tables", label: "All Office Tables" },
//   { value: "office-tables-boss", label: "Boss Tables" },
//   { value: "office-tables-conference", label: "Conference Room Tables" },
//   { value: "office-tables-work", label: "Work Tables" },
//   { value: "office-tables-center", label: "Center Tables" },
//   { value: "office-tables-height-adjustable", label: "Height Adjustable Tables" },
// ],
// };

// const PLACEHOLDER = "/placeholder.jpg";

// // -------------- page --------------
// const CategoryProducts = () => {
//   const navigate = useNavigate();
//   const { category } = useParams<{ category: string }>();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   // figure out the "family" key for subcategories (e.g., "sofa" for any sofa-*)
//   const familyKey = useMemo(() => {
//     if (!category) return undefined;
//     const keys = Object.keys(SUBCATEGORY_MAP);
//     // pick the longest matching key to be safe
//     return keys
//       .filter((k) => category === k || category.startsWith(k))
//       .sort((a, b) => b.length - a.length)[0];
//   }, [category]);

//   // subcategories for this family (if any)
//   const subcats = familyKey ? SUBCATEGORY_MAP[familyKey] : [];

//   // thumbnails for each subcategory: slug → image url
//   const [subThumbs, setSubThumbs] = useState<Record<string, string>>({});

//   // fetch thumbnails dynamically (first product image in each subcategory)
//   useEffect(() => {
//     let cancelled = false;
//     const run = async () => {
//       if (!subcats.length) {
//         setSubThumbs({});
//         return;
//       }
//       try {
//         const token = localStorage.getItem("token") || "";
//         const results = await Promise.all(
//           subcats.map(async (s) => {
//             try {
//               // uses existing endpoint; we take the first product (if any)
//               const data: Product[] = await apiGetRequest(
//                 `products/getProductsByCategory/${s.value}`,
//                 token
//               );
//               const img =
//                 data?.length ? firstImageFrom(data[0]?.imageUrl) ?? PLACEHOLDER : PLACEHOLDER;
//               return [s.value, img] as const;
//             } catch {
//               return [s.value, PLACEHOLDER] as const;
//             }
//           })
//         );
//         if (!cancelled) {
//           const map: Record<string, string> = {};
//           results.forEach(([slug, img]) => (map[slug] = img));
//           setSubThumbs(map);
//         }
//       } catch {
//         if (!cancelled) setSubThumbs({});
//       }
//     };
//     run();
//     return () => {
//       cancelled = true;
//     };
//   }, [familyKey]); // re-fetch when switching to a new family

//   // fetch current list of products
//   useEffect(() => {
//     if (!category) return;
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token") || "";
//         const data = await apiGetRequest(
//           `products/getProductsByCategory/${category}`,
//           token
//         );
//         setProducts(data ?? []);
//       } catch (err) {
//         console.error("❌ Error fetching products:", err);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [category]);

//   if (loading) {
//     return <div className="container mx-auto px-4 py-10">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       <main className="flex-1 container mx-auto px-4 py-10">
//         {/* Breadcrumb */}
//         <div className="text-sm text-muted-foreground mb-4">
//           <Link to="/" className="hover:underline">Home</Link> /{" "}
//           <span className="capitalize">{category?.replace(/-/g, " ")}</span>

//         </div>

//         {/* Title */}
//         <h1 className="text-2xl font-semibold mb-5 capitalize">
//   {category?.replace(/-/g, " ")}
// </h1>


//         {/* ✅ Dynamic subcategory strip (images from API) */}
//         {!!subcats.length && (
//          <div className="mb-6">
//   {/* smaller, auto-fit grid */}
//   <div className="[grid-template-columns:repeat(auto-fit,minmax(120px,1fr))] grid gap-3">
//     {subcats.map((s) => {
//       const active = category === s.value;
//       const img = subThumbs[s.value] || PLACEHOLDER;
//       return (
//         <button
//           key={s.value}
//           type="button"
//           onClick={() => navigate(`/${s.value}`)}
//         className={`text-left rounded-lg border bg-white overflow-hidden transition hover:shadow-md focus:outline-none ${
//   active ? "border-primary" : "border-gray-200"
// }`}

//         >
//           {/* smaller thumbnail box */}
//           <div className="w-full h-24 sm:h-28 overflow-hidden">
//             <img
//               src={img}
//               alt={s.label}
//               className="h-full w-full object-cover"
//               // onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
//             />
//           </div>
//           {/* tighter label */}
//           <div className="px-2 py-1.5">
//             <div className="text-xs sm:text-[13px] font-medium leading-tight line-clamp-2">
//               {s.label}
//             </div>
//           </div>
//         </button>
//       );
//     })}
//   </div>
// </div>

//         )}

//         {/* Product Grid */}
//         {products.length === 0 ? (
//           <p className="text-muted-foreground">No products found in {category}.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((p) => {
//               const firstImage = firstImageFrom(p.imageUrl) || PLACEHOLDER;
//               return (
//                 <div
//                   key={p.id}
//                   className="group cursor-pointer"
//                   onClick={() => navigate("/product", { state: { id: p.id } })}
//                   role="button"
//                   tabIndex={0}
//                   onKeyDown={(e) => e.key === "Enter" && navigate("/product", { state: { id: p.id } })}
//                 >
//                   <div className="aspect-[4/3] overflow-hidden rounded-lg border bg-white">
//                     <img
//                       src={firstImage}
//                       alt={p.name}
//                       onError={(e) => ((e.currentTarget.src = PLACEHOLDER))}
//                       className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//                     />
//                   </div>
//                   <div className="mt-3">
//                     <h3 className="text-base font-semibold">{p.name}</h3>
//                     <p className="text-sm text-muted-foreground">
//                       Rs. {Number(p.price ?? 0).toLocaleString("en-IN")}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default CategoryProducts;





// src/pages/CategoryProducts.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { apiGetRequest } from "../../service.tsx";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | string[];
  category: string;
};

// -------------- helpers --------------
const firstImageFrom = (img?: string | string[]) => {
  if (!img) return undefined;
  if (Array.isArray(img)) return img[0];
  try {
    const parsed = JSON.parse(img);
    if (Array.isArray(parsed) && parsed.length) return String(parsed[0]);
  } catch { }
  const first = img.split(/[,;\s]+/).find(Boolean);
  return first;
};

// Parent → subcategories (labels & slugs are static; thumbnails are fetched)
const SUBCATEGORY_MAP: Record<string, { value: string; label: string }[]> = {
  // LIVING ROOM
  "sofa": [
    { value: "sofa", label: "All Sofas" },
    { value: "single-seaters", label: "Single-Seaters" },
    { value: "two-seaters", label: "Two-Seaters" },
    { value: "three-seaters", label: "Three-Seaters" },
    { value: "four-seaters-more", label: "Four-Seaters & More" },
    { value: "corner-sofas", label: "Corner Sofas" },
    { value: "sectional-sofas", label: "Sectional Sofas" },
    { value: "modular-sofas", label: "Modular Sofas" },
    { value: "lounge-sofas", label: "Lounge Sofas" },
    { value: "recliners", label: "Recliners" },
    { value: "office-sofas", label: "Office Sofas" },
    { value: "outdoor-sofas", label: "Outdoor Sofas" },
  ],

  "recliners": [
    { value: "recliners", label: "All Recliners" },
  ],

  "coffee-tables": [
    { value: "coffee-tables", label: "All Coffee Tables" },
  ],

  // BEDROOM
  "beds": [
    { value: "beds", label: "All Beds" },
    { value: "upholstered-beds", label: "Upholstered Beds" },
    { value: "wooden-beds", label: "Wooden Beds" },
    { value: "beds-with-storage", label: "Beds with Storage" },
    { value: "childrens-beds", label: "Children's Beds" },
  ],

  "bedside-tables": [
    { value: "bedside-tables", label: "Bedside Tables" },
  ],

  // DINING ROOM
  "dining-tables": [
    { value: "dining-tables", label: "All Dining Tables" },
    { value: "four-seater-dining-tables", label: "Four-Seater Dining Tables" },
    { value: "six-seater-dining-tables", label: "Six-Seater Dining Tables" },
    { value: "eight-seater-dining-tables", label: "Eight-Seater Dining Tables" },
  ],

  "dining-chairs": [
    { value: "dining-chairs", label: "Dining Chairs" },
  ],

  // KIDS ROOM
  "kids-furniture": [
    { value: "kids-furniture", label: "All Kids Furniture" },
    { value: "childrens-beds", label: "Children's Beds" },
    { value: "study-tables", label: "Study Tables" },
    { value: "study-chairs", label: "Study Chairs" },
  ],

  // OUTDOOR
  "outdoor-furniture": [
    { value: "outdoor-furniture", label: "All Outdoor Furniture" },
    { value: "outdoor-sofas", label: "Outdoor Sofas" },
    { value: "outdoor-chairs", label: "Outdoor Chairs" },
    { value: "outdoor-tables", label: "Outdoor Tables" },
  ],

  // ACCENT FURNITURE
  "accent-furniture": [
    { value: "accent-furniture", label: "All Accent Furniture" },
    { value: "accent-chairs", label: "Accent Chairs" },
    { value: "armchairs", label: "Armchairs" },
    { value: "ottomans", label: "Ottomans" },
    { value: "poufs", label: "Poufs" },
    { value: "benches", label: "Benches" },
    { value: "bean-bags", label: "Bean Bags" },
  ],

  // OFFICE CHAIRS
  "office-chairs": [
    { value: "office-chairs", label: "All Office Chairs" },
    { value: "executive-chairs", label: "Executive Chairs" },
    { value: "lounge-chairs", label: "Lounge Chairs" },
    { value: "workstation-chairs", label: "Workstation Chairs" },
    { value: "visitor-chairs", label: "Visitor Chairs" },
    { value: "training-chairs", label: "Training Chairs" },
    { value: "public-seatings", label: "Public Seatings" },
  ],

  // OFFICE TABLES
  "office-tables": [
    { value: "office-tables", label: "All Office Tables" },
    { value: "boss-tables", label: "Boss Tables" },
    { value: "conference-room-tables", label: "Conference Room Tables" },
    { value: "worktables", label: "Worktables" },
    { value: "height-adjustable-tables", label: "Height Adjustable Tables" },
  ],

  // OFFICE SOFAS
  "office-sofas": [
    { value: "office-sofas", label: "Office Sofas" },
  ],


  // CAFE FURNITURE
  "cafe-chairs": [
    { value: "cafe-chairs", label: "Cafe Chairs" },
  ],

  "cafe-tables": [
    { value: "cafe-tables", label: "Cafe Tables" },
  ],

  "bar-stools": [
    { value: "bar-stools", label: "Bar Stools" },
  ],

  // SPARES
  // SPARES
  "spares": [
    { value: "spares", label: "All Spares" },
     { value: "bed-headboards", label: "Bed Headboards" },
    { value: "table-bases", label: "Table Bases" },
    { value: "gas-lifts", label: "Gas Lifts" },
    { value: "handles", label: "Handles" },
    { value: "chair-bases", label: "Chair Base" },
    { value: "pin-wheels", label: "Pin Wheels" },
  ],

  // CATALOGUES
  "catalogues": [
    { value: "product-catalogues", label: "Product Catalogues" },
    { value: "fabric-catalogues", label: "Fabric Catalogues" },
  ],

  // PROJECTS
  "projects": [
    { value: "home-projects", label: "Home Projects" },
    { value: "office-projects", label: "Office Projects" },
    { value: "testimonials", label: "Testimonials" },
  ],
};

const PLACEHOLDER = "/placeholder.jpg";

// -------------- page --------------
const CategoryProducts = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  // figure out the "family" key for subcategories (e.g., "sofa" for any sofa-*)
  const familyKey = useMemo(() => {
    if (!category) return undefined;
    const keys = Object.keys(SUBCATEGORY_MAP);
    // pick the longest matching key to be safe
    return keys
      .filter((k) => category === k || category.startsWith(k))
      .sort((a, b) => b.length - a.length)[0];
  }, [category]);

  // subcategories for this family (if any)
  const subcats = familyKey ? SUBCATEGORY_MAP[familyKey] : [];
  useEffect(() => {
    const stateSubcategory = location.state?.selectedSubcategory;

    if (stateSubcategory) {
      setSelectedSubcategory(stateSubcategory);
    } else if (category) {
      setSelectedSubcategory(category);
    }
  }, [category, location.state]);

  const filteredProducts = selectedSubcategory
    ? products.filter((p) => p.category === selectedSubcategory)
    : products;

  // thumbnails for each subcategory: slug → image url
  const [subThumbs, setSubThumbs] = useState<Record<string, string>>({});

  // fetch thumbnails dynamically (first product image in each subcategory)
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!subcats.length) {
        setSubThumbs({});
        return;
      }
      try {
        const token = localStorage.getItem("token") || "";
        const results = await Promise.all(
          subcats.map(async (s) => {
            try {

              // Special handling for All Sofas
              if (s.value === "sofa") {
                const sofaCategories = [
                  "single-seaters",
                  "two-seaters",
                  "three-seaters",
                  "four-seaters-more",
                  "corner-sofas",
                  "sectional-sofas",
                  "modular-sofas",
                  "lounge-sofas",
                  "recliners",
                  "office-sofas",
                  "outdoor-sofas",
                ];

                let lastImage = PLACEHOLDER;

                for (const cat of sofaCategories) {
                  const data: Product[] = await apiGetRequest(
                    `products/getProductsByCategory/${cat}`,
                    token
                  );

                  if (data?.length) {
                    lastImage =
                      firstImageFrom(data[data.length - 1]?.imageUrl) ||
                      lastImage;
                  }
                }

                return [s.value, lastImage] as const;
              }
              if (s.value === "beds") {
                const bedCategories = [
                  "upholstered-beds",
                  "wooden-beds",
                  "beds-with-storage",
                  "childrens-beds",
                ];

                let lastImage = PLACEHOLDER;

                for (const cat of bedCategories) {
                  const data: Product[] = await apiGetRequest(
                    `products/getProductsByCategory/${cat}`,
                    token
                  );

                  if (data?.length) {
                    lastImage =
                      firstImageFrom(data[data.length - 1]?.imageUrl) || lastImage;
                  }
                }

                return [s.value, lastImage] as const;
              }

              if (s.value === "dining-tables") {
                const diningCategories = [
                  "four-seater-dining-tables",
                  "six-seater-dining-tables",
                  "eight-seater-dining-tables",
                ];

                let lastImage = PLACEHOLDER;

                for (const cat of diningCategories) {
                  const data: Product[] = await apiGetRequest(
                    `products/getProductsByCategory/${cat}`,
                    token
                  );

                  if (data?.length) {
                    lastImage =
                      firstImageFrom(data[data.length - 1]?.imageUrl) || lastImage;
                  }
                }

                return [s.value, lastImage] as const;
              }
              if (s.value === "kids-furniture") {
                const kidsCategories = [
                  "childrens-beds",
                  "study-tables",
                  "study-chairs",
                ];

                let lastImage = PLACEHOLDER;

                for (const cat of kidsCategories) {
                  const data: Product[] = await apiGetRequest(
                    `products/getProductsByCategory/${cat}`,
                    token
                  );

                  if (data?.length) {
                    lastImage =
                      firstImageFrom(data[data.length - 1]?.imageUrl) || lastImage;
                  }
                }

                return [s.value, lastImage] as const;
              }
              // OUTDOOR FURNITURE
              if (s.value === "outdoor-furniture") {
                const categories = [
                  "outdoor-sofas",
                  "outdoor-chairs",
                  "outdoor-tables",
                ];

                let lastImage = PLACEHOLDER;

                for (const cat of categories) {
                  const data: Product[] = await apiGetRequest(
                    `products/getProductsByCategory/${cat}`,
                    token
                  );

                  if (data?.length) {
                    lastImage =
                      firstImageFrom(data[data.length - 1]?.imageUrl) || lastImage;
                  }
                }

                return [s.value, lastImage] as const;
              }

              // ACCENT FURNITURE
              if (s.value === "accent-furniture") {
                const categories = [
                  "accent-chairs",
                  "armchairs",
                  "ottomans",
                  "poufs",
                  "benches",
                  "bean-bags",
                ];

                let lastImage = PLACEHOLDER;

                for (const cat of categories) {
                  const data: Product[] = await apiGetRequest(
                    `products/getProductsByCategory/${cat}`,
                    token
                  );

                  if (data?.length) {
                    lastImage =
                      firstImageFrom(data[data.length - 1]?.imageUrl) || lastImage;
                  }
                }

                return [s.value, lastImage] as const;
              }

              // OFFICE CHAIRS
              if (s.value === "office-chairs") {
                const categories = [
                  "executive-chairs",
                  "lounge-chairs",
                  "workstation-chairs",
                  "visitor-chairs",
                  "training-chairs",
                  "public-seatings",
                ];

                let lastImage = PLACEHOLDER;

                for (const cat of categories) {
                  const data: Product[] = await apiGetRequest(
                    `products/getProductsByCategory/${cat}`,
                    token
                  );

                  if (data?.length) {
                    lastImage =
                      firstImageFrom(data[data.length - 1]?.imageUrl) || lastImage;
                  }
                }

                return [s.value, lastImage] as const;
              }

              // OFFICE TABLES
              if (s.value === "office-tables") {
                const categories = [
                  "boss-tables",
                  "conference-room-tables",
                  "worktables",
                  "height-adjustable-tables",
                ];

                let lastImage = PLACEHOLDER;

                for (const cat of categories) {
                  const data: Product[] = await apiGetRequest(
                    `products/getProductsByCategory/${cat}`,
                    token
                  );

                  if (data?.length) {
                    lastImage =
                      firstImageFrom(data[data.length - 1]?.imageUrl) || lastImage;
                  }
                }

                return [s.value, lastImage] as const;
              }
              if (s.value === "spares") {
  const categories = [
    "bed-headboards",
    "table-bases",
    "gas-lifts",
    "handles",
    "chair-bases",
    "pin-wheels",
  ];

  let lastImage = PLACEHOLDER;

  for (const cat of categories) {
    const data: Product[] = await apiGetRequest(
      `products/getProductsByCategory/${cat}`,
      token
    );

    if (data?.length) {
      lastImage =
        firstImageFrom(data[data.length - 1]?.imageUrl) || lastImage;
    }
  }

  return [s.value, lastImage] as const;
}
              const data: Product[] = await apiGetRequest(
                `products/getProductsByCategory/${s.value}`,
                token
              );

              const img =
                data?.length
                  ? firstImageFrom(data[0]?.imageUrl) ?? PLACEHOLDER
                  : PLACEHOLDER;

              return [s.value, img] as const;

            } catch {
              return [s.value, PLACEHOLDER] as const;
            }
          })
        );
        if (!cancelled) {
          const map: Record<string, string> = {};
          results.forEach(([slug, img]) => (map[slug] = img));
          setSubThumbs(map);
        }
      } catch {
        if (!cancelled) setSubThumbs({});
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [familyKey]); // re-fetch when switching to a new family

  // fetch current list of products
  useEffect(() => {
    if (!category) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token") || "";
        if (selectedSubcategory === "sofa") {
          const sofaCategories = [
            "single-seaters",
            "two-seaters",
            "three-seaters",
            "four-seaters-more",
            "corner-sofas",
            "sectional-sofas",
            "modular-sofas",
            "lounge-sofas",
            "recliners",
            "office-sofas",
            "outdoor-sofas",
          ];

          const responses = await Promise.all(
            sofaCategories.map((cat) =>
              apiGetRequest(`products/getProductsByCategory/${cat}`, token)
            )
          );

          setProducts(responses.flat());

        } else if (selectedSubcategory === "beds") {

          const bedCategories = [
            "upholstered-beds",
            "wooden-beds",
            "beds-with-storage",
            "childrens-beds",
          ];

          const responses = await Promise.all(
            bedCategories.map((cat) =>
              apiGetRequest(`products/getProductsByCategory/${cat}`, token)
            )
          );

          setProducts(responses.flat());

        }
        else if (selectedSubcategory === "dining-tables") {

          const diningCategories = [
            "four-seater-dining-tables",
            "six-seater-dining-tables",
            "eight-seater-dining-tables",
          ];

          const responses = await Promise.all(
            diningCategories.map((cat) =>
              apiGetRequest(`products/getProductsByCategory/${cat}`, token)
            )
          );

          setProducts(responses.flat());

        }
        else if (selectedSubcategory === "kids-furniture") {

          const kidsCategories = [
            "childrens-beds",
            "study-tables",
            "study-chairs",
          ];

          const responses = await Promise.all(
            kidsCategories.map((cat) =>
              apiGetRequest(
                `products/getProductsByCategory/${cat}`,
                token
              )
            )
          );

          setProducts(responses.flat());
        } else if (selectedSubcategory === "outdoor-furniture") {
          const categories = [
            "outdoor-sofas",
            "outdoor-chairs",
            "outdoor-tables",
          ];

          const responses = await Promise.all(
            categories.map((cat) =>
              apiGetRequest(`products/getProductsByCategory/${cat}`, token)
            )
          );

          setProducts(responses.flat());
        }

        else if (selectedSubcategory === "accent-furniture") {
          const categories = [
            "accent-chairs",
            "armchairs",
            "ottomans",
            "poufs",
            "benches",
            "bean-bags",
          ];

          const responses = await Promise.all(
            categories.map((cat) =>
              apiGetRequest(`products/getProductsByCategory/${cat}`, token)
            )
          );

          setProducts(responses.flat());
        }

        else if (selectedSubcategory === "office-chairs") {
          const categories = [
            "executive-chairs",
            "lounge-chairs",
            "workstation-chairs",
            "visitor-chairs",
            "training-chairs",
            "public-seatings",
          ];

          const responses = await Promise.all(
            categories.map((cat) =>
              apiGetRequest(`products/getProductsByCategory/${cat}`, token)
            )
          );

          setProducts(responses.flat());
        }

        else if (selectedSubcategory === "office-tables") {
          const categories = [
            "boss-tables",
            "conference-room-tables",
            "worktables",
            "height-adjustable-tables",
          ];

          const responses = await Promise.all(
            categories.map((cat) =>
              apiGetRequest(`products/getProductsByCategory/${cat}`, token)
            )
          );

          setProducts(responses.flat());
        }
        else if (selectedSubcategory === "spares") {
  const categories = [
    "bed-headboards",
    "table-bases",
    "gas-lifts",
    "handles",
    "chair-bases",
    "pin-wheels",
  ];

  const responses = await Promise.all(
    categories.map((cat) =>
      apiGetRequest(`products/getProductsByCategory/${cat}`, token)
    )
  );

  setProducts(responses.flat());
}
 else {
          const data = await apiGetRequest(
            `products/getProductsByCategory/${selectedSubcategory || category}`,
            token
          );


          setProducts(data ?? []);
        }
        // setProducts(data ?? []);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, selectedSubcategory]);

  if (loading) {
    return <div className="container mx-auto px-4 py-10">Loading...</div>;
  }



  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:underline">Home</Link> /{" "}
          <span className="capitalize">{category?.replace(/-/g, " ")}</span>

        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-5 capitalize">
          {category?.replace(/-/g, " ")}
        </h1>


        {/* ✅ Dynamic subcategory strip (images from API) */}
       {!!subcats.length && (
  <div className="mb-6">
    <div
      className={
        subcats.length === 1
          ? "flex"
          : "[grid-template-columns:repeat(auto-fit,minmax(120px,1fr))] grid gap-3"
      }
    >
      {subcats.map((s) => {
        const active = selectedSubcategory === s.value;
        const img = subThumbs[s.value] || PLACEHOLDER;
        const isSingle = subcats.length === 1;
        return (
          <button
            key={s.value}
            type="button"
            onClick={() => setSelectedSubcategory(s.value)}
            className={`text-left rounded-md border bg-white overflow-hidden transition hover:shadow-md focus:outline-none ${isSingle ? "w-[160px]" : ""
              } ${active ? "border-primary" : "border-gray-200"}`}
          >
            <div className={isSingle ? "w-full h-24 sm:h-28 overflow-hidden" : "w-full h-24 sm:h-28 overflow-hidden"}>
              <img
                src={img}
                alt={s.label}
                className="h-full w-full object-cover"
              />
            </div>
            <div className={isSingle ? "px-1.5 py-1" : "px-2 py-1.5"}>
              <div className={isSingle ? "text-[11px] font-medium leading-tight line-clamp-2" : "text-xs sm:text-[13px] font-medium leading-tight line-clamp-2"}>
                {s.label}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
)}

        {/* Product Grid */}
        {products.length === 0 ? (
          <p className="text-muted-foreground">No products found in {category}.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => {
              const firstImage = firstImageFrom(p.imageUrl) || PLACEHOLDER;
              return (
                <div
                  key={p.id}
                  className="group cursor-pointer"
                  onClick={() => navigate("/product", { state: { id: p.id } })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate("/product", { state: { id: p.id } })}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-lg border bg-white">
                    <img
                      src={firstImage}
                      alt={p.name}
                      onError={(e) => ((e.currentTarget.src = PLACEHOLDER))}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-base font-semibold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {p.price || "Price on Request"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryProducts;
