import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  FileText,
} from "lucide-react";
const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";

import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

import {
  apiGetRequest,
  apiDeleteRequest,
} from "../../../../service";

type Blog = {
  id: number;
  title: string;
  author: string;
  tag?: string;
  content: string;
  images: string[];
  isPublished: boolean;
  createdAt: string;
};

export default function Blogs() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] =
    useState("");

  const token = useMemo(
    () =>
      JSON.parse(
        localStorage.getItem("adminUser") ||
          "{}"
      )?.token,
    []
  );

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);

      const res = await apiGetRequest(
        "blog/getBlogs",
        token
      );

      const list = Array.isArray(res?.items)
        ? res.items
        : Array.isArray(res)
        ? res
        : [];

      setBlogs(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) => {
      const q = searchQuery.toLowerCase();

      return (
        blog.title
          ?.toLowerCase()
          .includes(q) ||
        blog.author
          ?.toLowerCase()
          .includes(q) ||
        blog.tag
          ?.toLowerCase()
          .includes(q) ||
        blog.content
          ?.toLowerCase()
          .includes(q)
      );
    }
  );

  const handleDelete = async (
    id: number,
    title: string
  ) => {
    const confirmDelete =
      window.confirm(
        `Delete "${title}" ?`
      );

    if (!confirmDelete) return;

    try {
      await apiDeleteRequest(
        `blog/deleteBlog/${id}`,
        token
      );

      setBlogs((prev) =>
        prev.filter(
          (blog) => blog.id !== id
        )
      );

      toast({
        title: "Blog Deleted",
        description:
          "Blog removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to delete blog",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#14294C]">
              Blogs
            </h1>

            <p className="text-muted-foreground">
              Manage all blogs
            </p>
          </div>

          <Link to="/admin/blogs/add">
            <Button className="bg-[#b53e1d] hover:bg-[#9f3518] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Blog
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                className="pl-10"
                placeholder="Search Blogs..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing{" "}
              {filteredBlogs.length} of{" "}
              {blogs.length} blogs
            </div>
          </CardContent>
        </Card>

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-4 text-lg font-semibold">
                No Blogs Found
              </h3>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map(
              (blog) => (
                <Card
                  key={blog.id}
                  className="overflow-hidden"
                >
                  <div className="aspect-[4/3] relative">

                    {blog.images?.[0] ? (
                      <img
  src={`${FILE_BASE_URL}${blog.images[0]}`}
  alt={blog.title}
  className="w-full h-full object-cover"
/>
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <FileText />
                      </div>
                    )}

                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium shadow ${
                        blog.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {blog.isPublished
                        ? "Published"
                        : "Draft"}
                    </span>
                  </div>

                  <CardContent className="p-4">
                    {blog.tag && (
                      <p className="text-xs font-medium text-[#b53e1d] uppercase mb-2">
                        {blog.tag}
                      </p>
                    )}

                    <h3 className="font-semibold text-lg line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-1">
                      By {blog.author}
                    </p>

                    <p className="text-sm mt-3 line-clamp-3">
                      {blog.content}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-muted-foreground">
                        {new Date(
                          blog.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          navigate(
                            "/admin/blogs/edit",
                            {
                              state: {
                                id: blog.id,
                              },
                            }
                          )
                        }
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDelete(
                            blog.id,
                            blog.title
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}