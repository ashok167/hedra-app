import React, { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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

import { apiPostRequest } from "../../../../service";

export default function AddBlog() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = useMemo(
    () =>
      JSON.parse(
        localStorage.getItem("adminUser") ||
          "{}"
      )?.token,
    []
  );

  const [title, setTitle] = useState("");
  const [author, setAuthor] =
    useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] =
    useState("");
  const [isPublished, setIsPublished] =
    useState(true);

  const [images, setImages] = useState<
    File[]
  >([]);
  const [imagePreviews, setImagePreviews] =
    useState<string[]>([]);

  const [submitting, setSubmitting] =
    useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const onPickImages = (
    files: FileList | null
  ) => {
    if (!files) return;

    const selectedFiles =
      Array.from(files);

    setImages((prev) => [
      ...prev,
      ...selectedFiles,
    ]);

    setImagePreviews((prev) => [
      ...prev,
      ...selectedFiles.map((file) =>
        URL.createObjectURL(file)
      ),
    ]);
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setTag("");
    setContent("");
    setIsPublished(true);

    setImages([]);
    setImagePreviews([]);
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

      images.forEach((img) => {
        fd.append("images", img);
      });

      await apiPostRequest(
        "blog/createBlog",
        fd,
        token
      );

      toast({
        title: "Blog Created",
        description:
          "Blog saved successfully",
      });

      navigate("/admin/blogs");
    } catch (err: any) {
      toast({
        title: "Error",
        description:
          err?.response?.data?.message ||
          "Failed to save blog",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

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
              Add Blog
            </h1>

            <p className="text-gray-900">
              Create a new blog post
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            <Card>
              <CardHeader>
                <CardTitle className="text-[#14294C]">
                  Blog Details
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <div>
                  <Label>
                    Blog Title *
                  </Label>

                  <Input
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }
                    placeholder="Enter blog title"
                  />
                </div>

                <div>
                  <Label>
                    Author *
                  </Label>

                  <Input
                    value={author}
                    onChange={(e) =>
                      setAuthor(
                        e.target.value
                      )
                    }
                    placeholder="Enter author name"
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
                    placeholder="Furniture Tips"
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
                    className="w-full h-10 rounded-md border px-3"
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
                    Content *
                  </Label>

                  <Textarea
                    rows={10}
                    value={content}
                    onChange={(e) =>
                      setContent(
                        e.target.value
                      )
                    }
                    placeholder="Write your blog content..."
                  />
                </div>

                {/* Images */}
                <div className="space-y-2">
                  <Label>
                    Blog Images
                  </Label>

                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                    <Upload className="w-8 h-8 mb-2" />

                    <p className="text-sm">
                      Click to upload images
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

                  <div className="flex flex-wrap gap-2">
                    {imagePreviews.map(
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
                            className="h-24 w-24 object-cover rounded border"
                          />

                          <button
                            type="button"
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5"
                            onClick={() => {
                              setImages(
                                (
                                  prev
                                ) =>
                                  prev.filter(
                                    (
                                      _,
                                      i
                                    ) =>
                                      i !==
                                      index
                                  )
                              );

                              setImagePreviews(
                                (
                                  prev
                                ) =>
                                  prev.filter(
                                    (
                                      _,
                                      i
                                    ) =>
                                      i !==
                                      index
                                  )
                              );
                            }}
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

          {/* RIGHT */}
          <div className="space-y-6">

            <Card>
              <CardHeader>
                <CardTitle className="text-[#14294C]">
                  Actions
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#b53e1d] hover:bg-[#9f3518]"
                >
                  {submitting ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Blog
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={resetForm}
                >
                  Reset
                </Button>

              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#14294C]">
                  Tips
                </CardTitle>
              </CardHeader>

              <CardContent className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Use high-quality images
                  for better blog
                  appearance.
                </div>
              </CardContent>
            </Card>

          </div>

        </form>
      </div>
    </AdminLayout>
  );
}