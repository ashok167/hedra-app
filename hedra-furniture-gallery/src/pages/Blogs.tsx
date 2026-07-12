import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { apiGetRequest } from "../../service";
const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;

export default function Blogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);

      const res = await apiGetRequest(
  "blog/getBlogs",
  ""
);
console.log("Blogs API:", res);

      const blogList = Array.isArray(res?.blogs)
  ? res.blogs
  : Array.isArray(res?.data)
  ? res.data
  : Array.isArray(res)
  ? res
  : [];

setBlogs(blogList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="py-20 text-center">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  const featured = blogs?.[0];
  const others = blogs?.slice(1);

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Featured Blog */}
        {featured && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <img
  src={`${FILE_BASE_URL}${featured.images?.[0]}`}
  alt={featured.title}
  className="w-full h-[400px] object-cover rounded-xl"
/>

            <div>
              <p className="text-red-600 font-semibold">
                {featured.tag}
              </p>

              <h1 className="text-4xl font-bold mt-3">
                {featured.title}
              </h1>

              <p className="text-gray-500 mt-2">
                {new Date(
                  featured.createdAt
                ).toLocaleDateString()}{" "}
                • {featured.author}
              </p>

              <p className="mt-4 text-gray-700 line-clamp-4">
                {featured.content}
              </p>

              <button
                onClick={() =>
                  navigate(
                    `/blogs/${featured.id}`
                  )
                }
                className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg"
              >
                Read More
              </button>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <h2 className="text-3xl font-bold mb-8">
          Blogs & Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {others?.map((blog: any) => (
            <div
              key={blog.id}
              onClick={() =>
                navigate(
                  `/blogs/${blog.id}`
                )
              }
              className="cursor-pointer"
            >
              <img
  src={`${FILE_BASE_URL}${blog.images?.[0]}`}
  alt={blog.title}
  className="w-full h-[250px] object-cover rounded-lg"
/>

              <h3 className="font-bold text-lg mt-4">
                {blog.title}
              </h3>

              <p className="text-gray-600 mt-2 line-clamp-3">
                {blog.content}
              </p>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </>
  );
}