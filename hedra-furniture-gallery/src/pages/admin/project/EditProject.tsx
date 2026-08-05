import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

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

import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

import {
  apiGetRequest,
  apiPutRequest,
} from "../../../../service";

type Project = {
  id: string;
  projectType: string;
  title: string;
  description: string;
  imageUrl?: string;
  client?: string;
  year?: string;
};

export default function EditProject() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const navigate = useNavigate();
 const { state } = useLocation() as {
  state?: { id?: string };
};

const id = state?.id;

  const token = useMemo(
    () => JSON.parse(localStorage.getItem("adminUser") || "{}")?.token,
    []
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [project, setProject] =
    useState<Project | null>(null);

  const [projectType, setProjectType] = useState("");
const [title, setTitle] = useState("");
const [client, setClient] = useState("");
const [year, setYear] = useState("");
  const [description, setDescription] =
    useState("");

 const [newImages, setNewImages] =
  useState<File[]>([]);

  // const [imagePreview, setImagePreview] =
  //   useState<string | null>(null);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

 const loadProject = async () => {
  try {
    setLoading(true);

    const res = await apiGetRequest(
      `projects/getProjectById/${id}`,
      token
    );

    const projectData = res.project || res;

    setProject(projectData);

let images: string[] = [];

try {
  images = projectData.imageUrl?.startsWith("[")
    ? JSON.parse(projectData.imageUrl)
    : [projectData.imageUrl];
} catch {
  images = [];
}

setExistingImages(images);

setProjectType(projectData.projectType || "");
setTitle(projectData.title || "");
setClient(projectData.client || "");
setYear(projectData.year?.toString() || "");
setDescription(projectData.description || "");

  } catch (error) {
    console.log(error);

    toast({
      title: "Error",
      description: "Failed to load project",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

  // const onPickImage = (
  //   file?: File | null
  // ) => {
  //   setNewImage(file ?? null);

  //   if (imagePreview) {
  //     URL.revokeObjectURL(imagePreview);
  //   }

  //   setImagePreview(
  //     file ? URL.createObjectURL(file) : null
  //   );
  // };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

  const fd = new FormData();

fd.append("projectType", projectType);
fd.append("title", title);
fd.append("client", client);
fd.append("year", year);
fd.append("description", description);
fd.append(
  "existingImages",
  JSON.stringify(existingImages)
);

newImages.forEach((image) => {
  fd.append("images", image);
});

await apiPutRequest(
  `projects/updateProject/${id}`,
  fd,
  token
);

      toast({
        title: "Project Updated",
        description:
          "Project updated successfully",
      });

       navigate("/admin/projects");
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Failed to update project",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  const getImageUrl = (img: string) => {
  if (!img) return "";

  // Already a complete URL
  if (
    img.startsWith("http://") ||
    img.startsWith("https://") ||
    img.startsWith("blob:")
  ) {
    return img;
  }

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Remove /api from the API URL
  const baseUrl = apiUrl.replace(/\/api\/?$/, "");

  return `${baseUrl}${img.startsWith("/") ? "" : "/"}${img}`;
};

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() =>
              navigate("/admin/projects")
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-[#14294C]">
              Edit Project
            </h1>

            <p className="text-gray-900">
              Update project information
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            Loading...
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#14294C]">
                    Project Details
                  </CardTitle>
                </CardHeader>

              <CardContent className="space-y-4">

  <div>
    <Label>Project Type *</Label>

    <select
      value={projectType}
      onChange={(e) =>
        setProjectType(e.target.value)
      }
      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
    >
      <option value="">
        Select Project Type
      </option>

      <option value="Home">
        Home Project
      </option>

      <option value="Office">
        Office Project
      </option>
    </select>
  </div>

  <div>
    <Label>Project Title *</Label>

    <Input
      value={title}
      onChange={(e) =>
        setTitle(e.target.value)
      }
    />
  </div>

  <div>
    <Label>Client *</Label>

    <Input
      value={client}
      onChange={(e) =>
        setClient(e.target.value)
      }
    />
  </div>

  <div>
    <Label>Year *</Label>

    <Input
      type="number"
      value={year}
      onChange={(e) =>
        setYear(e.target.value)
      }
    />
  </div>

  <div>
    <Label>Description *</Label>

    <Textarea
      rows={5}
      value={description}
      onChange={(e) =>
        setDescription(e.target.value)
      }
    />
  </div>

  {/* Image Section */}

<div className="space-y-4">
  <Label>Project Images</Label>

  {/* Existing Images */}
  <div>
    <p className="text-sm font-medium mb-2">
      Current Images
    </p>

   {existingImages.length > 0 ? (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {existingImages.map(
      (img: string, index: number) => (
        <div
          key={index}
          className="relative"
        >
          <img
  src={getImageUrl(img)}
  alt={`Project ${index + 1}`}
  className="w-full h-32 object-cover rounded border"
  onError={(e) => {
    console.error("Image failed:", getImageUrl(img));
  }}
/>

          <button
            type="button"
            onClick={() =>
              setExistingImages((prev) =>
                prev.filter(
                  (_, i) => i !== index
                )
              )
            }
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )
    )}
  </div>
) : (
  <div className="border rounded p-4 text-center">
    No Images
  </div>
)}
  </div>

  {/* Upload New Images */}
  <div>
    <label className="border-2 border-dashed rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer">
      <Upload className="h-8 w-8 mb-2" />

      <span className="font-medium">
        Select New Images
      </span>

      <span className="text-xs text-muted-foreground">
        Multiple images supported
      </span>

      <input
        type="file"
        multiple
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const files = Array.from(
            e.target.files || []
          );

          setNewImages((prev) => [
            ...prev,
            ...files,
          ]);
        }}
      />
    </label>
  </div>

  {/* Selected Images Preview */}
  {newImages.length > 0 && (
    <div>
      <p className="text-sm font-medium mb-2">
        Selected Images
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {newImages.map((file, index) => (
          <div
            key={index}
            className="relative"
          >
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="w-full h-32 object-cover rounded border"
            />

            <button
              type="button"
              onClick={() =>
                setNewImages((prev) =>
                  prev.filter(
                    (_, i) => i !== index
                  )
                )
              }
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-3"
        onClick={() => setNewImages([])}
      >
        <X className="h-4 w-4 mr-2" />
        Remove All
      </Button>
    </div>
  )}
</div>
</CardContent>
              </Card>
            </div>

            {/* RIGHT */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#14294C]">
                    Save Changes
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-[#b53e1d] hover:bg-[#9f3518] text-white"
                  >
                    {saving ? (
                      "Updating..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Project
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}