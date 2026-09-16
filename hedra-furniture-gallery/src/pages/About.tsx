
import React from "react";
import { Users, Award, Clock, Heart, Hammer, Eye, Ruler, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-furniture.jpg";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const values = [
  {
    icon: Hammer,
    title: "Craftsmanship",
    description: "Made by skilled hands.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "Know what goes into your furniture.",
  },
  {
    icon: Ruler,
    title: "Customization",
    description: "Made around your space and requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "From our factory to your space.",
  },
];

const stats = [
  { number: "10+", label: "Years of Experience" },
  { number: "200+", label: "Projects" },
  { number: "40+", label: "Skilled Craftsmen" },
  { number: "95%", label: "On Time Completion" },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">

        {/* ==============================
            PAGE HEADER
        =============================== */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">

              <h1 className="text-4xl md:text-5xl font-bold text-[#14294C] mb-4">
                About Edendek
              </h1>

              <p className="text-2xl md:text-3xl font-semibold text-[#14294C] mb-5">
                Made to Fit Your Space. Built to Last.
              </p>

              <p className="text-lg text-gray-900 max-w-3xl mx-auto leading-relaxed">
                At Edendek, we bring together design, craftsmanship and
                in-house manufacturing to create furniture around your
                requirements—not around fixed models. From a single custom
                piece to complete projects, we turn ideas into furniture that
                is made to work beautifully in your space.
              </p>

            </div>
          </div>
        </section>

        {/* ==============================
            OUR STORY
        =============================== */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* IMAGE */}
              <div className="lg:order-first">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">

                  <img
                    src={heroImage}
                    alt="Edendek furniture manufacturing"
                    className="w-full h-full object-cover"
                  />

                </div>
              </div>

              {/* STORY */}
              <div>

                <h2 className="text-3xl md:text-4xl font-bold text-[#14294C] mb-6">
                  Our Story
                </h2>

                <div className="space-y-4 text-gray-900">

                  <p>
                    Founded in 2016, Edendek began with a simple vision: to
                    create well-designed, high-quality furniture made around
                    the needs of each customer.
                  </p>

                  <p>
                    What started with a team of five has grown into an
                    in-house manufacturing facility in Chennai, supported by
                    40+ skilled craftsmen and dedicated teams across furniture
                    production, woodworking, metal fabrication, quality
                    control, delivery and installation.
                  </p>

                  <p>
                    Today, we manufacture home and office furniture for
                    homeowners, architects, interior designers and businesses
                    across South India, from individual custom pieces to
                    complete projects.
                  </p>

                  <p>
                    We combine thoughtful design, skilled craftsmanship and
                    in-house manufacturing to create furniture that is
                    practical, comfortable and built for everyday life.
                  </p>

                  <p className="font-semibold text-[#14294C]">
                    At Edendek, we believe great furniture should be made
                    around you - not the other way around.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ==============================
            STATS
        =============================== */}
        <section className="py-16 text-center bg-[linear-gradient(90deg,#293654_0%,#88747B_50%,#B78A83_100%)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

              {stats.map((stat, index) => (
                <div key={index}>

                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>

                  <div className="text-white/90 font-medium">
                    {stat.label}
                  </div>

                </div>
              ))}

            </div>

          </div>
        </section>

        {/* ==============================
            OUR VALUES
        =============================== */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-12">

              <h2 className="text-3xl md:text-4xl font-bold text-[#14294C] mb-4">
                Our Values
              </h2>

              <p className="text-lg text-gray-900 max-w-2xl mx-auto">
                The principles that guide how we design, manufacture and
                deliver furniture.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              {values.map((value, index) => {
                const IconComponent = value.icon;

                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-card transition-all duration-300 group"
                  >

                    <CardContent className="pt-8 pb-6">

                      <div className="w-16 h-16 bg-[#b53e1d] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                        <IconComponent className="h-8 w-8 text-primary-foreground" />
                      </div>

                      <h3 className="text-xl font-semibold text-[#14294C] mb-3 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>

                      <p className="text-gray-900">
                        {value.description}
                      </p>

                    </CardContent>

                  </Card>
                );
              })}

            </div>

          </div>
        </section>

        {/* ==============================
            THE TEAM + OUR EXPERTS
        =============================== */}
        <section id="team" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

              {/* LEFT - THE TEAM */}
              <div>

                <h2 className="text-3xl md:text-4xl font-bold text-[#14294C] mb-6">
                  The Team
                </h2>

                <h3 className="text-2xl md:text-3xl font-semibold text-[#14294C] mb-6">
                  Skilled People Behind Every Piece
                </h3>

                <div className="space-y-5 text-gray-900 leading-relaxed">

                  <p>
                    At Edendek, great furniture begins with the people who
                    make it.
                  </p>

                  <p>
                    Our team brings together 40+ skilled craftsmen along with
                    professionals across sales, design coordination,
                    purchasing, quality control, delivery, installation and
                    customer care. Together, they form an integrated team that
                    takes a furniture project from an initial idea to a
                    finished product.
                  </p>

                  <p>
                    Our manufacturing teams specialize in different aspects
                    of furniture making, including sofa manufacturing, chair
                    production, woodworking and metal fabrication.
                  </p>

                  <p>
                    Skilled carpenters, tailors, upholstery specialists,
                    fitters, helpers and experienced masters work together to
                    bring each design to life.
                  </p>

                </div>

              </div>

              {/* RIGHT - OLD OUR EXPERTS */}
              <div className="lg:pl-6">

                <h3 className="text-3xl md:text-4xl font-bold text-[#14294C] mb-4">
                  Our Experts
                </h3>

                <Accordion
                  type="single"
                  collapsible
                  defaultValue="md-founder"
                  className="rounded-lg border bg-card"
                >

                  {/* CEO */}
                  <AccordionItem value="md-founder" className="border-b">

                    <AccordionTrigger className="px-4 py-4 text-left text-[#14294C] text-lg font-semibold">
                      Chief Executive Officer
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 pt-2">

                      <div className="space-y-3 text-sm md:text-base">

                        <div className="font-medium text-gray-900">
                          Mr. Ashok Kumar
                        </div>

                        <ul className="list-disc pl-5 space-y-2 text-gray-500">

                          <li>
                            Email:{" "}
                            <a
                              href="mailto:ashok@edendek.com"
                              className="hover:underline"
                            >
                              ashok@edendek.com
                            </a>
                          </li>

                        </ul>

                      </div>

                    </AccordionContent>

                  </AccordionItem>

                  {/* COO */}
                  <AccordionItem value="bdm" className="border-b">

                    <AccordionTrigger className="px-4 py-4 text-left text-[#14294C] text-lg font-semibold">
                      Chief Operating Officer
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 pt-2">

                      <div className="space-y-3 text-sm md:text-base">

                        <div className="font-medium text-gray-900">
                          Mr. Siva Raman
                        </div>

                        <ul className="list-disc pl-5 space-y-2 text-gray-500">

                          <li>
                            Email:{" "}
                            <a
                              href="mailto:siva@edendek.com"
                              className="hover:underline"
                            >
                              siva@edendek.com
                            </a>
                          </li>

                        </ul>

                      </div>

                    </AccordionContent>

                  </AccordionItem>

                  {/* HEAD OF QUALITY CONTROL */}
                  <AccordionItem value="fabrications" className="border-b">

                    <AccordionTrigger className="px-4 py-4 text-left text-[#14294C] text-lg font-semibold">
                      Head of Quality control
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 pt-2">

                      <div className="space-y-3 text-sm md:text-base">

                        <div className="font-medium text-gray-900">
                          Mr. Balakrishnan
                        </div>

                        <ul className="list-disc pl-5 space-y-2 text-gray-500">

                          <li>
                            Email:{" "}
                            <a
                              href="mailto:balakrishnan@edendek.com"
                              className="hover:underline"
                            >
                              balakrishnan@edendek.com
                            </a>
                          </li>

                        </ul>

                      </div>

                    </AccordionContent>

                  </AccordionItem>

                  {/* HEAD OF SALES */}
                  <AccordionItem value="furnishings" className="border-b">

                    <AccordionTrigger className="px-4 py-4 text-left text-[#14294C] text-lg font-semibold">
                      Head of Sales
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 pt-2">

                      <div className="space-y-3 text-sm md:text-base">

                        <div className="font-medium text-gray-900">
                          Mr. Siraj
                        </div>

                        <ul className="list-disc pl-5 space-y-2 text-gray-500">

                          <li>
                            Email:{" "}
                            <a
                              href="mailto:siraj@edendek.com"
                              className="hover:underline"
                            >
                              siraj@edendek.com
                            </a>
                          </li>

                        </ul>

                      </div>

                    </AccordionContent>

                  </AccordionItem>

                  {/* HEAD OF PROCUREMENT */}
                  <AccordionItem value="operations">

                    <AccordionTrigger className="px-4 py-4 text-left text-[#14294C] text-lg font-semibold">
                      Head of procurement
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6 pt-2">

                      <div className="space-y-3 text-sm md:text-base">

                        <div className="font-medium text-gray-900">
                          Mr. Karthick
                        </div>

                        <ul className="list-disc pl-5 space-y-2 text-gray-500">

                          <li>
                            Email:{" "}
                            <a
                              href="mailto:karthick@edendek.com"
                              className="hover:underline"
                            >
                              karthick@edendek.com
                            </a>
                          </li>

                        </ul>

                      </div>

                    </AccordionContent>

                  </AccordionItem>

                </Accordion>

              </div>

            </div>

          </div>
        </section>

        {/* ==============================
            OUR MISSION
        =============================== */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-4xl mx-auto text-center">

              <h2 className="text-3xl md:text-4xl font-bold text-[#14294C] mb-6">
                Our Mission
              </h2>

              <h3 className="text-2xl md:text-3xl font-semibold text-[#14294C] mb-8">
                Making Custom Furniture Better. More Transparent. More
                Personal.
              </h3>

              <p className="text-xl text-gray-900 leading-relaxed mb-6">
                Our mission is to redefine the way custom furniture is
                designed and manufactured—giving people the freedom to create
                furniture that truly belongs in their space.
              </p>

              <p className="text-lg text-gray-900 leading-relaxed mb-6">
                We combine thoughtful design, skilled craftsmanship, quality
                materials and in-house manufacturing to create furniture
                around individual requirements rather than forcing customers
                to choose from fixed models.
              </p>

              <p className="text-lg text-gray-900 leading-relaxed mb-6">
                From the first consultation and material selection to
                manufacturing, quality control, delivery and installation, we
                believe every step should be handled with clarity, care and
                accountability.
              </p>

              <p className="text-lg text-gray-900 leading-relaxed mb-8">
                Our commitment is simple: to make furniture that looks right,
                feels right, works for everyday life and is made to last.
              </p>

              {/* QUOTE */}
              <div className="bg-gradient-card p-8 rounded-lg border border-border">

                <blockquote className="text-lg italic text-gray-900">
                  “Furniture should not be limited by what is already
                  available. If you can imagine it, we believe it should be
                  possible to make it—properly, practically and transparently.”
                </blockquote>

                <cite className="block mt-4 text-gray-500 font-medium not-italic">
                  — The Edendek Team
                </cite>

              </div>

            </div>

          </div>
        </section>

        {/* ==============================
            CALL TO ACTION
        =============================== */}
        <section className="py-16 text-center bg-[linear-gradient(90deg,#293654_0%,#88747B_50%,#B78A83_100%)]">

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Create Your Story?
            </h2>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let us help you find or create the perfect furniture pieces
              that will become cherished parts of your home or workspace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <a href="/contact">
                <button className="bg-[#b53e1d] text-white hover:bg-[#b53e1d]/90 px-8 py-3 rounded-md font-semibold transition-colors">
                  Get in Touch
                </button>
              </a>

              <a href="/product-category">
                <button className="border border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-md font-semibold transition-colors">
                  Explore Our Work
                </button>
              </a>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}

