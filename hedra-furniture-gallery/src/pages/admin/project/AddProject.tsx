import React, { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

import { apiPostRequest } from "../../../../service";

export default function AddProject() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = useMemo(
    () => JSON.parse(localStorage.getItem("adminUser") || "{}")?.token,
    []
  );

const [projectType, setProjectType] = useState("");
const [title, setTitle] = useState("");
const [client, setClient] = useState("");
const [year, setYear] = useState("");
const [description, setDescription] = useState("");

const [images, setImages] = useState<File[]>([]);
const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [submitting, setSubmitting] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

 const onPickImages = (files: FileList | null) => {
  if (!files) return;

  const selectedFiles = Array.from(files);

  setImages((prev) => [...prev, ...selectedFiles]);

  setImagePreviews((prev) => [
    ...prev,
    ...selectedFiles.map((file) =>
      URL.createObjectURL(file)
    ),
  ]);
};

  const resetForm = () => {
    setProjectType("");
    setTitle("");
    setClient("");
    setYear("");
    setDescription("");

  setImages([]);
setImagePreviews([]);
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setSubmitting(true);

    const fd = new FormData();

    fd.append("projectType", projectType);
    fd.append("title", title);
    fd.append("client", client);
    fd.append("year", year);
    fd.append("description", description);
   images.forEach((img) => {
  fd.append("images", img);
});

    // BEFORE API CALL
    console.log("===== PROJECT DATA =====");
    console.log("projectType:", projectType);
    console.log("title:", title);
    console.log("client:", client);
    console.log("year:", year);
    console.log("description:", description);
    

    for (const pair of fd.entries()) {
      console.log(pair[0], pair[1]);
    }

    const response = await apiPostRequest(
      "projects/createProject",
      fd,
      token
    );

    // AFTER API SUCCESS
    console.log("===== API RESPONSE =====");
    console.log(response);

    toast({
      title: "Project Created",
      description: "Project saved successfully",
    });

    navigate("/admin/projects");

  } catch (err: any) {

    // API ERROR
    console.log("===== API ERROR =====");
    console.log(err);
    console.log(err?.response);
    console.log(err?.response?.data);

    toast({
      title: "Error",
      description:
        err?.response?.data?.message ||
        "Failed to save project",
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
              navigate("/admin/projects")
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-[#14294C]">
              Add Project
            </h1>

            <p className="text-gray-900">
              Create a new project
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* LEFT SIDE */}
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
  onChange={(e) => setProjectType(e.target.value)}
  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b53e1d]"
>
  <option value="">Select Project Type</option>
  <option value="Home">Home Project</option>
  <option value="Office">Office Project</option>
</select>
    </div>

    <div>
      <Label>Project Title *</Label>

      <Input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Enter project title"
        className="focus:border-[#b53e1d]"
      />
    </div>

    <div>
      <Label>Client *</Label>

      <Input
        value={client}
        onChange={(e) =>
          setClient(e.target.value)
        }
        placeholder="Enter client name"
        className="focus:border-[#b53e1d]"
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
        placeholder="2025"
        className="focus:border-[#b53e1d]"
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
        placeholder="Enter project description"
        className="focus:border-[#b53e1d]"
      />
    </div>

    <div className="space-y-2">
      <Label>Project Image *</Label>

      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />

        <p className="text-sm text-muted-foreground">
          Click to upload image
        </p>

       <input
  type="file"
  multiple
  className="hidden"
  accept="image/*"
  onChange={(e) =>
    onPickImages(e.target.files)
  }
/>
      </label>

   <div className="flex flex-wrap gap-2">
  {imagePreviews.map((preview, index) => (
    <div key={index} className="relative">
      <img
        src={preview}
        alt=""
        className="h-24 w-24 object-cover rounded-md border"
      />

      <button
        type="button"
        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5"
        onClick={() => {
          setImages((prev) =>
            prev.filter((_, i) => i !== index)
          );

          setImagePreviews((prev) =>
            prev.filter((_, i) => i !== index)
          );
        }}
      >
        ×
      </button>
    </div>
  ))}
</div>
    </div>

  </CardContent>
</Card>
          </div>

          {/* RIGHT SIDE */}
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
                  className="w-full bg-[#b53e1d] hover:bg-[#9f3518] text-white"
                >
                  {submitting ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Project
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
                  Use high-quality project images.
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}