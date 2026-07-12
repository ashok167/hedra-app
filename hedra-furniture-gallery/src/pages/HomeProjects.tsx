import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiGetRequest } from "../../service";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.45,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

type Project = {
  id: string;
  projectType: string;
  title: string;
  description: string;
  imageUrl: string;
  client: string;
  year: string;
};

export default function HomeProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response = await apiGetRequest(
        "projects/getHomeProjects",
        null
      );

      console.log("API Response:", response);

      const data = Array.isArray(response)
        ? response
        : response?.projects || [];

      setProjects(data);

      console.log("Loaded Projects:", data);
    } catch (error) {
      console.error("Project Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
            >
              <motion.h1
                variants={item}
                className="text-4xl md:text-5xl font-bold text-[#14294C] mb-4"
              >
                Home Projects
              </motion.h1>

              <motion.div
                variants={item}
                className="w-10 h-[2px] bg-[#14294C] mx-auto mb-6"
              />

              <motion.p
                variants={item}
                className="text-lg text-gray-900 max-w-2xl mx-auto"
              >
                Explore our portfolio of completed home furniture projects.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-20 text-lg">
                Loading Projects...
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20 text-lg">
                No Home Projects Found
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-elegant transition-all duration-300 group"
                  >
                    <div
                      className="aspect-[4/3] overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/homeprojects/${project.id}`)}
                    >
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL.replace(
                          "/api/",
                          ""
                        )}${project.imageUrl?.startsWith("[")
                            ? JSON.parse(project.imageUrl)[0]
                            : project.imageUrl
                          }`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-[#b53e1d] text-white hover:bg-[#b53e1d]">
                          {project.projectType}
                        </Badge>

                        <span className="text-sm text-gray-500">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-[#14294C] mb-2">
                        {project.title}
                      </h3>

                      <p className="text-gray-900 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="border-t pt-4">
                        <p className="text-sm">
                          <span className="font-medium text-gray-900">
                            Client:
                          </span>{" "}
                          <span className="text-gray-500">
                            {project.client}
                          </span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center bg-[linear-gradient(90deg,#293654_0%,#88747B_50%,#B78A83_100%)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let us bring your vision to life with our expertise in custom
              furniture design and manufacturing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <button className="bg-[#b53e1d] text-white hover:bg-[#b53e1d]/90 px-8 py-3 rounded-md font-semibold">
                  Get a Quote
                </button>
              </a>

              <a href="/catalog">
                <button className="border border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-md font-semibold">
                  View Catalog
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, Variants } from "framer-motion";
// import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { apiGetRequest } from "../../service";

// const container: Variants = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.45,
//     },
//   },
// };

// const item: Variants = {
//   hidden: { opacity: 0, y: 40 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 1.1,
//       ease: [0.16, 1, 0.3, 1],
//     },
//   },
// };

// type Project = {
//   id: string;
//   projectType: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   client: string;
//   year: string;
// };

// export default function HomeProjects() {
//     const navigate = useNavigate();
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     loadProjects();
//   }, []);

//   const loadProjects = async () => {
//     try {
//       setLoading(true);

//       const response = await apiGetRequest(
//         "projects/getHomeProjects",
//         null
//       );

//       console.log("API Response:", response);

//       const data = Array.isArray(response)
//         ? response
//         : response?.projects || [];

//       setProjects(data);

//       console.log("Loaded Projects:", data);
//     } catch (error) {
//       console.error("Project Load Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       <main className="flex-1">
//         {/* Header Section */}
//         <section className="bg-muted/30 py-16">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               className="text-center"
//               variants={container}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.6 }}
//             >
//               <motion.h1
//                 variants={item}
//                 className="text-4xl md:text-5xl font-bold text-[#14294C] mb-4"
//               >
//                 Home Projects
//               </motion.h1>

//               <motion.div
//                 variants={item}
//                 className="w-10 h-[2px] bg-[#14294C] mx-auto mb-6"
//               />

//               <motion.p
//                 variants={item}
//                 className="text-lg text-gray-900 max-w-2xl mx-auto"
//               >
//                 Explore our portfolio of completed home furniture projects.
//               </motion.p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Projects Grid */}
//         <section className="py-16">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             {loading ? (
//               <div className="text-center py-20 text-lg">
//                 Loading Projects...
//               </div>
//             ) : projects.length === 0 ? (
//               <div className="text-center py-20 text-lg">
//                 No Home Projects Found
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
//                 {projects.map((project) => (
//                   <Card
//                     key={project.id}
//                     className="overflow-hidden hover:shadow-elegant transition-all duration-300 group"
//                   >
//                     <div
//   className="aspect-[4/3] overflow-hidden cursor-pointer"
//   onClick={() => navigate(`/homeprojects/${project.id}`)}
// >
//   <img
//     src={`${import.meta.env.VITE_API_BASE_URL.replace(
//       "/api/",
//       ""
//     )}${project.imageUrl}`}
//     alt={project.title}
//     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//   />
// </div>

//                     <CardContent className="p-6">
//                       <div className="flex items-center justify-between mb-3">
//                         <Badge className="bg-[#b53e1d] text-white hover:bg-[#b53e1d]">
//                           {project.projectType}
//                         </Badge>

//                         <span className="text-sm text-gray-500">
//                           {project.year}
//                         </span>
//                       </div>

//                       <h3 className="text-xl font-semibold text-[#14294C] mb-2">
//                         {project.title}
//                       </h3>

//                       <p className="text-gray-900 mb-4 line-clamp-3">
//                         {project.description}
//                       </p>

//                       <div className="border-t pt-4">
//                         <p className="text-sm">
//                           <span className="font-medium text-gray-900">
//                             Client:
//                           </span>{" "}
//                           <span className="text-gray-500">
//                             {project.client}
//                           </span>
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="py-16 text-center bg-[linear-gradient(90deg,#293654_0%,#88747B_50%,#B78A83_100%)]">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//               Ready to Start Your Project?
//             </h2>

//             <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//               Let us bring your vision to life with our expertise in custom
//               furniture design and manufacturing.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a href="/contact">
//                 <button className="bg-[#b53e1d] text-white hover:bg-[#b53e1d]/90 px-8 py-3 rounded-md font-semibold">
//                   Get a Quote
//                 </button>
//               </a>

//               <a href="/catalog">
//                 <button className="border border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-md font-semibold">
//                   View Catalog
//                 </button>
//               </a>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }