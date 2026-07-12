import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  MessageSquare,
} from "lucide-react";

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

type Testimonial = {
  id: number;
  clientName: string;
  designation: string;
  company: string;
  message: string;
  isPublished: boolean;
  createdAt: string;
};

export default function Testimonials() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const token = useMemo(
    () =>
      JSON.parse(
        localStorage.getItem("adminUser") || "{}"
      )?.token,
    []
  );

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);

      const res = await apiGetRequest(
        "testimonials/getTestimonials",
        token
      );

      const list = Array.isArray(res?.items)
        ? res.items
        : Array.isArray(res)
        ? res
        : [];

      setTestimonials(list);
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredTestimonials = testimonials.filter((item) => {
    const q = searchQuery.toLowerCase();

    return (
      item.clientName?.toLowerCase().includes(q) ||
      item.designation?.toLowerCase().includes(q) ||
      item.company?.toLowerCase().includes(q) ||
      item.message?.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (
    id: number,
    name: string
  ) => {
    const confirmDelete = window.confirm(
      `Delete testimonial from "${name}" ?`
    );

    if (!confirmDelete) return;

    try {
      await apiDeleteRequest(
        `testimonials/deleteTestimonial/${id}`,
        token
      );

      setTestimonials((prev) =>
        prev.filter((item) => item.id !== id)
      );

      toast({
        title: "Deleted",
        description:
          "Testimonial deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to delete testimonial.",
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
              Client Testimonials
            </h1>

            <p className="text-muted-foreground">
              Manage client testimonials
            </p>
          </div>

          <Link to="/admin/testimonials/add">
            <Button className="bg-[#b53e1d] hover:bg-[#9f3518] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
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
                placeholder="Search testimonials..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredTestimonials.length} of{" "}
              {testimonials.length} testimonials
            </div>

          </CardContent>
        </Card>

        {/* List */}

        {loading ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">

              <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-4 text-lg font-semibold">
                No Testimonials Found
              </h3>

            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredTestimonials.map((item) => (
              <Card key={item.id}>

                <CardContent className="p-5">

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-lg font-semibold">
                        {item.clientName}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {item.designation}
                      </p>

                      <p className="text-sm font-medium text-[#b53e1d]">
                        {item.company}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.isPublished
                        ? "Published"
                        : "Draft"}
                    </span>

                  </div>

                  <p className="text-sm mt-4 line-clamp-5">
                    "{item.message}"
                  </p>

                  <div className="mt-4 text-xs text-muted-foreground">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2 mt-5">

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        navigate(
                          "/admin/testimonials/edit",
                          {
                            state: {
                              id: item.id,
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
                          item.id,
                          item.clientName
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