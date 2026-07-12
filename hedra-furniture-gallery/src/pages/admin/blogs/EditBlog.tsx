import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Upload,
  ImageIcon,
} from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

import {
  apiGetRequest,
  apiPutRequest,
} from "../../../../service";
const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;

export default function EditBlog() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const blogId = location.state?.id;

  const token = useMemo(
    () =>
      JSON.parse(
        localStorage.getItem("adminUser") ||
          "{}"
      )?.token,
    []
  );

  const [loading, setLoading] =
    useState(true);
  const [submitting, setSubmitting] =
    useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] =
    useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] =
    useState("");

  const [isPublished, setIsPublished] =
    useState(true);

  const [existingImages, setExistingImages] =
    useState<string[]>([]);

  const [newImages, setNewImages] =
    useState<File[]>([]);

  const [
    newImagePreviews,
    setNewImagePreviews,
  ] = useState<string[]>([]);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  useEffect(() => {
    if (blogId) {
      loadBlog();
    }
  }, [blogId]);

  const loadBlog = async () => {
    try {
      setLoading(true);

      const res = await apiGetRequest(
        `blog/getBlogById/${blogId}`,
        token
      );

      const blog = res?.blog || res;

      setTitle(blog.title || "");
      setAuthor(blog.author || "");
      setTag(blog.tag || "");
      setContent(blog.content || "");

      setIsPublished(
        blog.isPublished ?? true
      );

      setExistingImages(
        blog.images || []
      );
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description:
          "Failed to load blog",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onPickImages = (
    files: FileList | null
  ) => {
    if (!files) return;

    const selectedFiles =
      Array.from(files);

    setNewImages((prev) => [
      ...prev,
      ...selectedFiles,
    ]);

    setNewImagePreviews((prev) => [
      ...prev,
      ...selectedFiles.map((file) =>
        URL.createObjectURL(file)
      ),
    ]);
  };

  const removeExistingImage = (
    image: string
  ) => {
    setExistingImages((prev) =>
      prev.filter((img) => img !== image)
    );
  };

  const removeNewImage = (
    index: number
  ) => {
    setNewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setNewImagePreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const fd = new FormData();

      fd.append("title", title);
      fd.append("author", author);
      fd.append("tag", tag);
      fd.append("content", content);

      fd.append(
        "isPublished",
        String(isPublished)
      );

      fd.append(
        "existingImages",
        JSON.stringify(existingImages)
      );

      newImages.forEach((img) => {
        fd.append("images", img);
      });

      await apiPutRequest(
        `blog/updateBlog/${blogId}`,
        fd,
        token
      );

      toast({
        title: "Blog Updated",
        description:
          "Blog updated successfully",
      });

      navigate("/admin/blogs");
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data
            ?.message ||
          "Failed to update blog",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-10">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() =>
              navigate("/admin/blogs")
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-[#14294C]">
              Edit Blog
            </h1>

            <p className="text-gray-900">
              Update blog details
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            <Card>
              <CardHeader>
                <CardTitle>
                  Blog Details
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <div>
                  <Label>
                    Blog Title
                  </Label>

                  <Input
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>
                    Author
                  </Label>

                  <Input
                    value={author}
                    onChange={(e) =>
                      setAuthor(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Tag</Label>

                  <Input
                    value={tag}
                    onChange={(e) =>
                      setTag(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>
                    Publish Status
                  </Label>

                  <select
                    value={
                      isPublished
                        ? "true"
                        : "false"
                    }
                    onChange={(e) =>
                      setIsPublished(
                        e.target.value ===
                          "true"
                      )
                    }
                    className="w-full h-10 border rounded-md px-3"
                  >
                    <option value="true">
                      Published
                    </option>

                    <option value="false">
                      Draft
                    </option>
                  </select>
                </div>

                <div>
                  <Label>
                    Content
                  </Label>

                  <Textarea
                    rows={10}
                    value={content}
                    onChange={(e) =>
                      setContent(
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Existing Images */}

                <div>
                  <Label>
                    Existing Images
                  </Label>

                  <div className="flex flex-wrap gap-3 mt-2">
                    {existingImages.map(
                      (
                        image,
                        index
                      ) => (
                        <div
                          key={index}
                          className="relative"
                        >
                          <img
  src={`${FILE_BASE_URL}${image}`}
  alt=""
  className="h-24 w-24 rounded border object-cover"
/>

                          <button
                            type="button"
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5"
                            onClick={() =>
                              removeExistingImage(
                                image
                              )
                            }
                          >
                            ×
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Upload New Images */}

                <div>
                  <Label>
                    Add New Images
                  </Label>

                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer mt-2">
                    <Upload className="w-8 h-8 mb-2" />

                    <p>
                      Click to upload
                    </p>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        onPickImages(
                          e.target.files
                        )
                      }
                    />
                  </label>

                  <div className="flex flex-wrap gap-3 mt-3">
                    {newImagePreviews.map(
                      (
                        preview,
                        index
                      ) => (
                        <div
                          key={index}
                          className="relative"
                        >
                          <img
                            src={preview}
                            alt=""
                            className="h-24 w-24 rounded border object-cover"
                          />

                          <button
                            type="button"
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5"
                            onClick={() =>
                              removeNewImage(
                                index
                              )
                            }
                          >
                            ×
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>

          </div>

          {/* Right */}
          <div className="space-y-6">

            <Card>
              <CardHeader>
                <CardTitle>
                  Actions
                </CardTitle>
              </CardHeader>

              <CardContent>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#b53e1d] hover:bg-[#9f3518]"
                >
                  {submitting ? (
                    "Updating..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Blog
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Tips
                </CardTitle>
              </CardHeader>

              <CardContent className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Keep images optimized
                  for better performance.
                </div>
              </CardContent>
            </Card>

          </div>

        </form>
      </div>
    </AdminLayout>
  );
}