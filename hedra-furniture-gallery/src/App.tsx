import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "@/contexts/ProductContext";
import { AuthProvider } from "@/contexts/AuthContext";

// User Pages
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import ProductPdfView from "./pages/ProductPdfView";
import CategoryBrowse from "@/pages/CategoryBrowse";
import ProductDetail from "./pages/ProductDetail";
import HomeProjects from "./pages/HomeProjects";
import HomeProjectDetails from "./pages/HomeProjectDetails";
import OfficeProjects from "./pages/OfficeProjects";
import OfficeProjectDetails from "./pages/OfficeProjectDetails";
import ProductCategory from "@/pages/ProductCategory";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import UploadCatalogue from "./pages/admin/catalogue/UploadCatalogue";

import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ui/ScrollToTop";
import CategoryProducts from "@/pages/CategoryProducts";
import ChooseUpholstery from "./pages/ChooseUpholstery";
import FunrifanEnquiry from "./pages/FunrifanEnquiry";
import ChairCatalog from "./pages/ChairCatalog";
import AdminCatalogues from "./pages/admin/catalogue/AdminCatalogues";
import EditCatalogue from "./pages/admin/catalogue/EditCatalogue";
import Projects from "./pages/admin/project/Project";
import AddProject from "./pages/admin/project/AddProject";
import EditProject from "./pages/admin/project/EditProject";
import AdminBlogs from "./pages/admin/blogs/Blogs";
import AddBlog from "./pages/admin/blogs/AddBlog";
import EditBlog from "./pages/admin/blogs/EditBlog";
import Testimonial from "@/pages/admin/client testimonials/Testimonials";
import AddTestimonial from "@/pages/admin/client testimonials/AddTestimonial";
import EditTestimonial from "@/pages/admin/client testimonials/EditTestimonial";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ProductProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductPdfView />} />
              <Route path="/catalog/:category/browse" element={<CategoryBrowse />} />
              <Route path="/catalog/:category" element={<Catalog />} />
              <Route path="/product" element={<ProductDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/homeprojects" element={<HomeProjects />} />
              <Route path="/homeprojects/:id" element={<HomeProjectDetails />} />
              <Route path="/officeprojects" element={<OfficeProjects />} />
              <Route
                path="/office-project-details/:id"
                element={<OfficeProjectDetails />}
              />
              <Route
                path="/product-category"
                element={<ProductCategory />}
              />
              <Route path="/chooseupholstery" element={<ChooseUpholstery />} />
              <Route path="/funrifanenquiry" element={< FunrifanEnquiry />} />
              <Route path="/chaircatalog" element={<ChairCatalog />} />
              <Route path="/services" element={<Services />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/:category" element={<CategoryProducts />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/products/add" element={<AddProduct />} />
              <Route path="/admin/products/edit" element={<EditProduct />} />
              <Route path="/admin/catalogue/upload" element={<UploadCatalogue />} />
              <Route path="/admin/catalogue" element={<AdminCatalogues />} />
              <Route path="/admin/catalogue/edit" element={<EditCatalogue />} />
              <Route path="/admin/projects" element={<Projects />} />
              <Route path="/admin/projects/add" element={<AddProject />} />
              <Route path="/admin/projects/edit" element={<EditProject />} />
              {/* Testimonial Routes */}
              <Route path="/admin/testimonials" element={<Testimonial />} />
              <Route path="/admin/testimonials/add" element={<AddTestimonial />} />
              <Route path="/admin/testimonials/edit" element={<EditTestimonial />} />
              {/* Blog Routes */}
              <Route path="/admin/blogs" element={<AdminBlogs />} />
              <Route path="/admin/blogs/add" element={<AddBlog />} />
              <Route path="/admin/blogs/edit" element={<EditBlog />} />


              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;




