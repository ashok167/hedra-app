import React, { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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

import { apiPostRequest } from "../../../../service";

export default function AddTestimonial() {
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

  const [submitting, setSubmitting] =
    useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const resetForm = () => {
    setClientName("");
    setDesignation("");
    setCompany("");
    setMessage("");
    setIsPublished(true);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await apiPostRequest(
        "testimonials/createTestimonial",
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
          "Testimonial added successfully.",
      });

      navigate("/admin/testimonials");
    } catch (err: any) {
      toast({
        title: "Error",
        description:
          err?.response?.data?.message ||
          "Failed to add testimonial.",
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
              navigate("/admin/testimonials")
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-[#14294C]">
              Add Testimonial
            </h1>

            <p className="text-gray-600">
              Create a new client testimonial
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
                    Client Name *
                  </Label>

                  <Input
                    value={clientName}
                    onChange={(e) =>
                      setClientName(
                        e.target.value
                      )
                    }
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <Label>
                    Designation *
                  </Label>

                  <Input
                    value={designation}
                    onChange={(e) =>
                      setDesignation(
                        e.target.value
                      )
                    }
                    placeholder="Enter designation"
                  />
                </div>

                <div>
                  <Label>
                    Company *
                  </Label>

                  <Input
                    value={company}
                    onChange={(e) =>
                      setCompany(
                        e.target.value
                      )
                    }
                    placeholder="Enter company"
                  />
                </div>

                <div>
  <Label>Publish Status</Label>

  <Input
    value="Published"
    disabled
    className="bg-gray-100 text-gray-700"
  />
</div>

                <div>
                  <Label>
                    Testimonial *
                  </Label>

                  <Textarea
                    rows={8}
                    value={message}
                    onChange={(e) =>
                      setMessage(
                        e.target.value
                      )
                    }
                    placeholder="Enter client testimonial..."
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
                      Save Testimonial
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
                  <MessageSquare className="h-4 w-4" />
                  Add genuine client feedback to
                  build trust with visitors.
                </div>

              </CardContent>

            </Card>

          </div>

        </form>

      </div>
    </AdminLayout>
  );
}