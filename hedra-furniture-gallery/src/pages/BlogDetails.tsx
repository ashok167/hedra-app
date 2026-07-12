import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { apiGetRequest } from "../../service";
const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;

export default function BlogDetails() {
    const { id } = useParams();
    const largeImageRef = useRef<HTMLImageElement>(null);
    const [largeImageHeight, setLargeImageHeight] = useState(0);

    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const token = localStorage.getItem("token") || "";

            const response = await apiGetRequest(
                `blog/getBlogById/${id}`,
                ""
            );
            console.log("Blog Details API:", response);

            setBlog(response);
        } catch (error) {
            console.error("Error fetching blog:", error);
        } finally {
            setLoading(false);
        }
    };

    // Update height when large image loads
    const handleLargeImageLoad = () => {
        if (largeImageRef.current) {
            const height = largeImageRef.current.offsetHeight;
            setLargeImageHeight(height);
            console.log("Large image height:", height);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="py-20 text-center">Loading...</div>
                <Footer />
            </>
        );
    }

    if (!blog) {
        return (
            <>
                <Header />
                <div className="py-20 text-center">Blog Not Found</div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <article className="bg-[#faf8f5] min-h-screen">
                {/* Hero Section */}
                <div className="relative">
                    <img
                        src={
    blog.images?.[0]
        ? `${FILE_BASE_URL}${blog.images[0]}`
        : "/placeholder.jpg"
}
                        alt={blog.title}
                        className="w-full h-[400px] object-cover"
                    />

                    <div className="absolute bottom-10 left-10">
                        <p className="text-xs uppercase tracking-[4px] text-white mb-3">
                            {blog.tag}
                        </p>

                        <h1 className="text-4xl md:text-5xl text-white font-light max-w-2xl">
                            {blog.title}
                        </h1>
                    </div>
                </div>

                {/* Article Layout */}
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid md:grid-cols-[220px_1fr] gap-16">
                        {/* Left Meta - Sticky */}
                        <aside className="text-sm text-gray-500 sticky top-24 h-fit">
                            <div className="mb-8">
                                <p className="uppercase text-xs tracking-wider mb-2">
                                    Date
                                </p>
                                <p>
                                    {new Date(
                                        blog.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="mb-8">
                                <p className="uppercase text-xs tracking-wider mb-2">
                                    Author
                                </p>
                                <p>{blog.author}</p>
                            </div>

                            <div>
                                <p className="uppercase text-xs tracking-wider mb-2">
                                    Category
                                </p>
                                <p>{blog.tag}</p>
                            </div>
                        </aside>

                        {/* Content - Scrollable */}
                        <div>
                            <div className="space-y-8 text-lg leading-9 text-gray-700">
                                {blog.content
                                    ?.split("\n")
                                    .filter(Boolean)
                                    .slice(0, 2)
                                    .map(
                                        (
                                            paragraph: string,
                                            index: number
                                        ) => (
                                            <p key={index}>
                                                {paragraph}
                                            </p>
                                        )
                                    )}
                            </div>

                            {/* Quote Block */}
                            <div className="bg-gray-100 p-10 my-12">
                                <p className="text-3xl italic text-gray-700 leading-relaxed">
                                   "Great ideas begin with curiosity, grow through knowledge, and inspire meaningful change."
                                </p>

                                <p className="mt-4 text-xs uppercase tracking-widest text-gray-500">
                                    Luxury Furniture Design
                                </p>
                            </div>

                            {/* Heading */}
                            <h2 className="text-3xl font-light mb-8">
                                The Material Language of Oak and
                                Linen
                            </h2>

                            <div className="space-y-8 text-lg leading-9 text-gray-700">
                                {blog.content
                                    ?.split("\n")
                                    .filter(Boolean)
                                    .slice(2)
                                    .map(
                                        (
                                            paragraph: string,
                                            index: number
                                        ) => (
                                            <p key={index}>
                                                {paragraph}
                                            </p>
                                        )
                                    )}
                            </div>

                            {/* Gallery - Responsive Height */}
                           {/* Gallery */}
{blog.images?.length > 1 && (
  <div className="flex gap-3 mt-16">
    {/* Big Image */}
    <div className="flex-[2]">
      <img
       src={`${FILE_BASE_URL}${blog.images[1]}`}
        alt="Gallery main"
        className="w-full h-[600px] object-cover"
      />
    </div>

    {/* Side Images */}
    <div className="flex-1 flex flex-col gap-3 h-[600px]">
      {blog.images.slice(2, 5).map((img: string, i: number, arr: string[]) => (
        <div
          key={i}
          className="overflow-hidden"
          style={{
            height: `${100 / arr.length}%`,
          }}
        >
          <img
            src={`${FILE_BASE_URL}${img}`}
            alt={`Gallery ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>
)}

                            {/* Additional Images (if more than 4 images) */}
                            {blog.images?.length > 4 && (
                                <div className="grid grid-cols-4 gap-3 mt-8">
                                  {/* Additional Images (after gallery images) */}
{blog.images?.length > 5 && (
    <div className="grid grid-cols-4 gap-3 mt-8">
        {blog.images.slice(5).map((img: string, i: number) => (
            <img
                key={i}
                src={`${FILE_BASE_URL}${img}`}
                alt={`Gallery ${i + 6}`}
                className="w-full h-[200px] object-cover"
            />
        ))}
    </div>
)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </>
    );
}
