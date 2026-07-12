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
  MessageSquare,
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

export default function EditTestimonial() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const testimonialId = location.state?.id;

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

  const [clientName, setClientName] =
    useState("");

  const [designation, setDesignation] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [isPublished, setIsPublished] =
    useState(true);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  useEffect(() => {
    if (testimonialId) {
      loadTestimonial();
    }
  }, [testimonialId]);

  const loadTestimonial = async () => {
    try {
      setLoading(true);

      const res = await apiGetRequest(
        `testimonials/getTestimonialById/${testimonialId}`,
        token
      );

      const testimonial =
        res?.testimonial || res;

      setClientName(
        testimonial.clientName || ""
      );

      setDesignation(
        testimonial.designation || ""
      );

      setCompany(
        testimonial.company || ""
      );

      setMessage(
        testimonial.message || ""
      );

      setIsPublished(
        testimonial.isPublished ?? true
      );
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description:
          "Failed to load testimonial.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await apiPutRequest(
        `testimonials/updateTestimonial/${testimonialId}`,
        {
          clientName,
          designation,
          company,
          message,
          isPublished,
        },
        token
      );

      toast({
        title: "Success",
        description:
          "Testimonial updated successfully.",
      });

      navigate("/admin/testimonials");
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Failed to update testimonial.",
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
              navigate(
                "/admin/testimonials"
              )
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-[#14294C]">
              Edit Testimonial
            </h1>

            <p className="text-gray-600">
              Update client testimonial
            </p>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >

          {/* Left */}

          <div className="lg:col-span-2">

            <Card>

              <CardHeader>
                <CardTitle className="text-[#14294C]">
                  Testimonial Details
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <div>
                  <Label>
                    Client Name
                  </Label>

                  <Input
                    value={clientName}
                    onChange={(e) =>
                      setClientName(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>
                    Designation
                  </Label>

                  <Input
                    value={designation}
                    onChange={(e) =>
                      setDesignation(
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label>
                    Company
                  </Label>

                  <Input
                    value={company}
                    onChange={(e) =>
                      setCompany(
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
                    Testimonial
                  </Label>

                  <Textarea
                    rows={8}
                    value={message}
                    onChange={(e) =>
                      setMessage(
                        e.target.value
                      )
                    }
                  />
                </div>

              </CardContent>

            </Card>

          </div>

          {/* Right */}

          <div className="space-y-6">

            <Card>

              <CardHeader>
                <CardTitle className="text-[#14294C]">
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
                      Update Testimonial
                    </>
                  )}
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
                  <MessageSquare className="h-4 w-4" />
                  Keep testimonials genuine and
                  professional.
                </div>

              </CardContent>

            </Card>

          </div>

        </form>

      </div>
    </AdminLayout>
  );
}