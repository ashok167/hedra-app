// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   category: ProductCategory;
//   images: string[];
//   specifications: Record<string, string>;
//   featured?: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export type ProductCategory =
//   // ===== HOME =====
//   | "sofa"
//   | "sofa-1-seater"
//   | "sofa-2-seater"
//   | "sofa-3-seater"
//   | "sofa-4-seater-plus"
//   | "sofa-5-seater"
//   | "sofa-6-plus"
//   | "sofa-corner"
//   | "sofa-sectional"
//   | "sofa-modular"
//   | "sofa-lounge"
//   | "sofa-recliner"
//   | "sofa-chairs"
//   | "sofa-outdoor"
//   | "sofa-new"
//   | "sofa-best-sellers"

//   | "coffee-tables"
//   | "coffee-tables-rectangular-square"
//   | "coffee-tables-oval-circular"
//   | "coffee-tables-storage"
//   | "coffee-tables-modern"
//   | "coffee-tables-new"

//   | "bed"
//   | "bed-upholstered"
//   | "bed-wooden"
//   | "bed-premium"
//   | "bed-storage"
//   | "bed-stools"
//   | "bed-bench"
//   | "bed-makeup-chairs"
//   | "bed-new"
//   | "bed-best-sellers"

//   | "ottomans"
//   | "ottomans-poufs"
//   | "ottomans-upholstered"
//   | "ottomans-benches"
//   | "ottomans-bench-storage"
//   | "ottomans-bedroom"
//   | "ottomans-foot-stools"
//   | "ottomans-new"
//   | "ottomans-best-sellers"

//   | "dining-table"
//   | "dining-table-4-seater"
//   | "dining-table-6-seater"
//   | "dining-table-10-seater"
//   | "dining-table-frames"

//   | "chairs"
//   | "chairs-dining"
//   | "chairs-study"
//   | "chairs-sofa"
//   | "chairs-swivel"
//   | "chairs-lounge"
//   | "chairs-makeup"
//   | "chairs-bar-stools"

//   // ===== OFFICE =====
//   | "office-boss-chairs"
//   | "office-executive-chairs"
//   | "office-workstation-chairs"
//   | "office-lounge-chairs"
//   | "office-sofas"

//   | "office-tables"
//   | "office-tables-boss"
//   | "office-tables-conference"
//   | "office-tables-work"
//   | "office-tables-center"
//   | "office-tables-height-adjustable"

//   | "office-meeting-room-chairs"
//   | "office-visitor-chairs"
//   | "office-training-chairs"
//   | "office-waiting-area-sofas"

//   // ===== CAFE =====
//   | "cafe-chairs"
//   | "cafe-bar-stools"
//   | "cafe-outdoor-chairs"
//   | "cafe-tables"
//   | "cafe-high-tables"
//   | "cafe-table-bases";

// export const PRODUCT_CATEGORIES: {
//   value: ProductCategory;
//   label: string;
// }[] = [
//   // ===== SOFAS =====
//   // { value: "sofa", label: "All Sofas" },
//   { value: "sofa-1-seater", label: "Single Seater Sofas" },
//   { value: "sofa-2-seater", label: "Two Seater Sofas" },
//   { value: "sofa-3-seater", label: "Three Seater Sofas" },
//   { value: "sofa-4-seater-plus", label: "Four Seater Sofas" },
//   { value: "sofa-5-seater", label: "Five Seater Sofas" },
//   { value: "sofa-6-plus", label: "Six Seater & More Sofas" },
//   { value: "sofa-corner", label: "Corner Sofas" },
//   { value: "sofa-sectional", label: "Sectional Sofas" },
//   { value: "sofa-modular", label: "Modular Sofas" },
//   { value: "sofa-lounge", label: "Lounge Sofas" },
//   { value: "sofa-recliner", label: "Recliner Sofas" },
//   { value: "sofa-chairs", label: "Sofa Chairs" },
//   { value: "sofa-outdoor", label: "Outdoor Sofas" },
//   { value: "sofa-new", label: "Sofa – New Launches" },
//   { value: "sofa-best-sellers", label: "Sofa – Best Sellers" },

//   // ===== COFFEE TABLES =====
//   // { value: "coffee-tables", label: "All Coffee Tables" },
//   { value: "coffee-tables-rectangular-square", label: "Rectangular & Square Coffee Tables" },
//   { value: "coffee-tables-oval-circular", label: "Oval & Circular Coffee Tables" },
//   { value: "coffee-tables-storage", label: "Coffee Tables with Storage" },
//   { value: "coffee-tables-modern", label: "Modern Coffee Tables" },
//   { value: "coffee-tables-new", label: "Coffee Tables – New Launches" },

//   // ===== BEDS =====
//   // { value: "bed", label: "All Beds" },
//   { value: "bed-upholstered", label: "Upholstered Beds" },
//   { value: "bed-wooden", label: "Wooden Beds" },
//   { value: "bed-premium", label: "Premium Beds" },
//   { value: "bed-storage", label: "Beds with Storage" },
//   { value: "bed-stools", label: "Bedroom Stools" },
//   { value: "bed-bench", label: "Bedroom Bench" },
//   { value: "bed-makeup-chairs", label: "Makeup Chairs" },
//   { value: "bed-new", label: "Beds – New Launches" },
//   { value: "bed-best-sellers", label: "Beds – Best Sellers" },

//   // ===== OTTOMANS =====
//   // { value: "ottomans", label: "All Ottomans & Benches" },
//   { value: "ottomans-poufs", label: "Poufs" },
//   { value: "ottomans-upholstered", label: "Upholstered Ottomans" },
//   { value: "ottomans-benches", label: "Benches" },
//   { value: "ottomans-bench-storage", label: "Bench with Storage" },
//   { value: "ottomans-bedroom", label: "Bedroom Ottomans" },
//   { value: "ottomans-foot-stools", label: "Foot Stools" },
//   { value: "ottomans-new", label: "Ottomans – New Launches" },
//   { value: "ottomans-best-sellers", label: "Ottomans – Best Sellers" },

//   // ===== DINING =====
//   // { value: "dining-table", label: "All Dining Tables" },
//   { value: "dining-table-4-seater", label: "4 Seater Dining Tables" },
//   { value: "dining-table-6-seater", label: "6 Seater Dining Tables" },
//   { value: "dining-table-10-seater", label: "10 Seater Dining Tables" },
//   { value: "dining-table-frames", label: "Dining Table Frames" },

//   // ===== CHAIRS =====
//   // { value: "chairs", label: "All Chairs & Stools" },
//   { value: "chairs-dining", label: "Dining Chairs" },
//   { value: "chairs-study", label: "Study Chairs" },
//   { value: "chairs-sofa", label: "Sofa Chairs" },
//   { value: "chairs-swivel", label: "Swivel Chairs" },
//   { value: "chairs-lounge", label: "Lounge Chairs" },
//   { value: "chairs-makeup", label: "Makeup Chairs" },
//   { value: "chairs-bar-stools", label: "Bar Stools" },

//   // ===== OFFICE =====
//   { value: "office-boss-chairs", label: "Boss Chairs" },
//   { value: "office-executive-chairs", label: "Executive Chairs" },
//   { value: "office-workstation-chairs", label: "Workstation Chairs" },
//   { value: "office-lounge-chairs", label: "Office Lounge Chairs" },
//   { value: "office-sofas", label: "Office Sofas" },

//   { value: "office-tables", label: "Office Tables" },
//   { value: "office-tables-boss", label: "Boss Tables" },
//   { value: "office-tables-conference", label: "Conference Room Tables" },
//   { value: "office-tables-work", label: "Work Tables" },
//   { value: "office-tables-center", label: "Office Center Tables" },
//   { value: "office-tables-height-adjustable", label: "Height Adjustable Tables" },

//   { value: "office-meeting-room-chairs", label: "Meeting Room Chairs" },
//   { value: "office-visitor-chairs", label: "Visitor Chairs" },
//   { value: "office-training-chairs", label: "Training Chairs" },
//   { value: "office-waiting-area-sofas", label: "Waiting Area Sofas" },

//   // ===== CAFE =====
//   { value: "cafe-chairs", label: "Cafe Chairs" },
//   { value: "cafe-bar-stools", label: "Bar Stools" },
//   { value: "cafe-outdoor-chairs", label: "Outdoor Chairs" },
//   { value: "cafe-tables", label: "Cafe Tables" },
//   { value: "cafe-high-tables", label: "High Tables" },
//   { value: "cafe-table-bases", label: "Table Bases" },
// ];


// export interface AdminUser {
//   id: string;
//   email: string;
//   role: string;
//   token: string;
// }



export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  images: string[];
  specifications: Record<string, string>;
   customizations?:
  | {
      type: string;
      options: string[];
    }[]
  | string;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory =
  | "single-seaters"
  | "two-seaters"
  | "three-seaters"
  | "four-seaters-more"
  | "corner-sofas"
  | "sectional-sofas"
  | "modular-sofas"
  | "lounge-sofas"
  | "recliners"
  | "office-sofas"
  | "outdoor-sofas"
  | "coffee-tables"
  | "upholstered-beds"
  | "wooden-beds"
  | "beds-with-storage"
  | "childrens-beds"
  | "bedside-tables"
  | "four-seater-dining-tables"
  | "six-seater-dining-tables"
  | "eight-seater-dining-tables"
  | "dining-chairs"
  | "study-tables"
  | "study-chairs"
  | "outdoor-chairs"
  | "outdoor-tables"
  | "accent-chairs"
  | "armchairs"
  | "ottomans"
  | "poufs"
  | "benches"
  | "bean-bags"
  | "executive-chairs"
  | "lounge-chairs"
  | "workstation-chairs"
  | "visitor-chairs"
  | "training-chairs"
  | "public-seatings"
  | "boss-tables"
  | "conference-room-tables"
  | "worktables"
  | "height-adjustable-tables"
  | "bed-headboards"
  | "table-bases"
  | "gas-lifts"
  | "handles"
  | "chair-bases"
  | "pin-wheels";

export const PRODUCT_CATEGORIES = [
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

  { value: "coffee-tables", label: "Coffee Tables" },

  { value: "upholstered-beds", label: "Upholstered Beds" },
  { value: "wooden-beds", label: "Wooden Beds" },
  { value: "beds-with-storage", label: "Beds with Storage" },
  { value: "childrens-beds", label: "Children's Beds" },
  { value: "bedside-tables", label: "Bedside Tables" },

  { value: "four-seater-dining-tables", label: "Four-Seater Dining Tables" },
  { value: "six-seater-dining-tables", label: "Six-Seater Dining Tables" },
  { value: "eight-seater-dining-tables", label: "Eight-Seater Dining Tables" },
  { value: "dining-chairs", label: "Dining Chairs" },

  { value: "study-tables", label: "Study Tables" },
  { value: "study-chairs", label: "Study Chairs" },

  { value: "outdoor-chairs", label: "Outdoor Chairs" },
  { value: "outdoor-tables", label: "Outdoor Tables" },

  { value: "accent-chairs", label: "Accent Chairs" },
  { value: "armchairs", label: "Armchairs" },
  { value: "ottomans", label: "Ottomans" },
  { value: "poufs", label: "Poufs" },
  { value: "benches", label: "Benches" },
  { value: "bean-bags", label: "Bean Bags" },

  { value: "executive-chairs", label: "Executive Chairs" },
  { value: "lounge-chairs", label: "Lounge Chairs" },
  { value: "workstation-chairs", label: "Workstation Chairs" },
  { value: "visitor-chairs", label: "Visitor Chairs" },
  { value: "training-chairs", label: "Training Chairs" },
  { value: "public-seatings", label: "Public Seatings" },

  { value: "boss-tables", label: "Boss Tables" },
  { value: "conference-room-tables", label: "Conference Room Tables" },
  { value: "worktables", label: "Worktables" },
  { value: "height-adjustable-tables", label: "Height Adjustable Tables" },

  
  { value: "cafe-chairs", label: "Cafe Chairs" },
  { value: "cafe-tables", label: "Cafe Tables" },
  { value: "bar-stools", label: "Bar Stools" },

  { value: "bed-headboards", label: "Bed Headboards" },
  { value: "table-bases", label: "Table Bases" },
  { value: "gas-lifts", label: "Gas Lifts" },
  { value: "handles", label: "Handles" },
  { value: "chair-bases", label: "Chair Bases" },
  { value: "pin-wheels", label: "Pin Wheels" },
];


export interface AdminUser {
  id: string;
  email: string;
  role: string;
  token: string;
}