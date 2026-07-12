import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { apiGetRequest } from "../../service";

export default function OfficeProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      const response = await apiGetRequest(
        `projects/getProjectById/${id}`,
        null
      );

      let images: string[] = [];

      try {
        images = response.imageUrl?.startsWith("[")
          ? JSON.parse(response.imageUrl)
          : [response.imageUrl];
      } catch {
        images = [response.imageUrl];
      }

      setProject({
        ...response,
        images,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-lg">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-20 text-center text-lg">
        Project Not Found
      </div>
    );
  }

  const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(
    "/api/",
    ""
  );

  const nextImage = () => {
    setActiveImage((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImage((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <Header />

      <main className="bg-[#F8F9FB] min-h-screen">
        <section className="max-w-7xl mx-auto px-6 py-8">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left Content */}
            <div>

              <span className="uppercase tracking-[4px] text-xs font-semibold text-[#b53e1d]">
                Office Interior Project
              </span>

              <h1 className="text-5xl font-bold text-[#14294C] mt-3 mb-6">
                {project.title}
              </h1>

              <div className="mb-6 space-y-4">
                {project.description
                  ?.split("\n")
                  .filter((para: string) => para.trim() !== "")
                  .map((para: string, index: number) => (
                    <p
                      key={index}
                      className="text-gray-600 leading-8 text-justify"
                    >
                      {para}
                    </p>
                  ))}
              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-[24px] bg-[#e8edf4] p-6 border border-white/50 shadow-[8px_8px_16px_#c5cad1,-8px_-8px_16px_#ffffff]">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Client
                  </p>

                  <h3 className="font-semibold text-[#14294C]">
                    {project.client}
                  </h3>
                </div>

                <div className="rounded-[24px] bg-[#e8edf4] p-6 border border-white/50 shadow-[8px_8px_16px_#c5cad1,-8px_-8px_16px_#ffffff]">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Project Type
                  </p>

                  <h3 className="font-semibold text-[#14294C]">
                    {project.projectType}
                  </h3>
                </div>

                <div className="rounded-[24px] bg-[#e8edf4] p-6 border border-white/50 shadow-[8px_8px_16px_#c5cad1,-8px_-8px_16px_#ffffff]">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Year
                  </p>

                  <h3 className="font-semibold text-[#14294C]">
                    {project.year}
                  </h3>
                </div>

                <div className="rounded-[24px] bg-[#e8edf4] p-6 border border-white/50 shadow-[8px_8px_16px_#c5cad1,-8px_-8px_16px_#ffffff]">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Location
                  </p>

                  <h3 className="font-semibold text-[#14294C]">
                    {project.location || "Chennai"}
                  </h3>
                </div>

              </div>

            </div>

            {/* Right Gallery */}
            <div>

              <div className="relative group">

                <img
                  src={`${BASE_URL}${project.images?.[activeImage]}`}
                  alt={project.title}
                  onClick={() => setShowModal(true)}
                  className="w-full h-[520px] object-cover rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.18)] cursor-pointer"
                />

                <div className="absolute bottom-5 right-5 flex gap-3">

                  <button
                    onClick={prevImage}
                    className="w-12 h-12 rounded-full bg-white/90 shadow-lg"
                  >
                    ←
                  </button>

                  <button
                    onClick={nextImage}
                    className="w-12 h-12 rounded-full bg-white/90 shadow-lg"
                  >
                    →
                  </button>

                </div>

              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4 mt-6">

                {project.images?.map(
                  (image: string, index: number) => (
                    <div
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`cursor-pointer overflow-hidden rounded-2xl border-2 ${
                        activeImage === index
                          ? "border-[#14294C]"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={`${BASE_URL}${image}`}
                        alt=""
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </section>

        {/* Fullscreen Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-8 text-white text-5xl"
            >
              ×
            </button>

            <button
              onClick={prevImage}
              className="absolute left-5 text-white text-5xl"
            >
              ❮
            </button>

            <img
              src={`${BASE_URL}${project.images?.[activeImage]}`}
              alt=""
              className="max-w-[90vw] max-h-[90vh] rounded-2xl"
            />

            <button
              onClick={nextImage}
              className="absolute right-5 text-white text-5xl"
            >
              ❯
            </button>

          </div>
        )}

      </main>

      <Footer />
    </>
  );
}