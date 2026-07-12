import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Search, FolderOpen } from "lucide-react";

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
const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;

type Project = {
  id: string;
  projectType: string;
  title: string;
  description: string;
  imageUrl?: string;
  client?: string;
  year?: string;
  createdAt: string;
};

export default function Project() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const token = useMemo(
    () => JSON.parse(localStorage.getItem("adminUser") || "{}")?.token,
    []
  );

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const res = await apiGetRequest(
        "projects/getProjects",
        token
      );
      console.log("API Response:", res);

      const list = Array.isArray(res?.items)
        ? res.items
        : Array.isArray(res)
          ? res
          : [];

      const formattedProjects = list.map((item) => ({
        ...item,
        imageUrl: item.imageUrl
          ? item.imageUrl.startsWith("[")
            ? JSON.parse(item.imageUrl)[0]
            : item.imageUrl
          : "",
      }));

      setProjects(formattedProjects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const projectTypes = [
  "All",
  ...new Set(
    projects
      .map((p) => p.projectType)
      .filter(Boolean)
  ),
];

const filteredProjects = projects.filter((project) => {
  const q = searchQuery.toLowerCase();

  const matchesSearch =
    project.title?.toLowerCase().includes(q) ||
    project.description?.toLowerCase().includes(q) ||
    project.projectType?.toLowerCase().includes(q);

  const matchesType =
    selectedType === "All" ||
    project.projectType === selectedType;

  return matchesSearch && matchesType;
});

  const handleDelete = async (
    code: string,
    name: string
  ) => {
    const confirmDelete = window.confirm(
      `Delete "${name}" ?`
    );

    if (!confirmDelete) return;

    try {
      await apiDeleteRequest(
        `projects/deleteProject/${code}`,
        token
      );

      setProjects((prev) =>
        prev.filter((item) => item.id !== code)
      );

      toast({
        title: "Project Deleted",
        description: `${name} removed successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
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
              Projects
            </h1>

            <p className="text-muted-foreground">
              Manage all projects
            </p>
          </div>

          <Link to="/admin/projects/add">
            <Button className="bg-[#b53e1d] hover:bg-[#9f3518] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
           <div className="flex flex-col md:flex-row gap-4">
  {/* Search */}
  <div className="relative flex-1">
    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

    <Input
      className="pl-10"
      placeholder="Search Project..."
      value={searchQuery}
      onChange={(e) =>
        setSearchQuery(e.target.value)
      }
    />
  </div>

  {/* Project Type Filter */}
  <select
    value={selectedType}
    onChange={(e) =>
      setSelectedType(e.target.value)
    }
    className="h-10 border rounded-md px-3 bg-gray-100 min-w-[180px]"
  >
    {projectTypes.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>
</div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredProjects.length} of{" "}
              {projects.length} projects
            </div>
          </CardContent>
        </Card>

        {/* Project Grid */}
        {loading ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FolderOpen className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-4 text-lg font-semibold">
                No Projects Found
              </h3>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden"
              >
                <div className="aspect-[4/3] relative">
                  {project.imageUrl ? (
                    <img
  src={`${FILE_BASE_URL}${project.imageUrl}`}
  alt={project.title}
  className="w-full h-full object-cover"
/>
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <FolderOpen />
                    </div>
                  )}

                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium shadow ${project.projectType === "Office"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                      }`}
                  >
                    {project.projectType}
                  </span>
                </div>

                <CardContent className="p-4">



                  <h3 className="font-semibold text-lg">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {project.client}
                  </p>

                  <p className="text-sm mt-2 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-muted-foreground">
                      {new Date(
                        project.createdAt
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
                          "/admin/projects/edit",
                          {
                            state: {
                              id: project.id,
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
                          project.id,
                          project.title
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}