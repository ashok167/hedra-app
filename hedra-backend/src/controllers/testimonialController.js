import prisma from "../config/db.js";

// Get All Testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Testimonial
export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Testimonial
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.create({
      data: {
        clientName: req.body.clientName,
        designation: req.body.designation,
        company: req.body.company,
        message: req.body.message,
        isPublished: req.body.isPublished === "true",
      },
    });

    res.status(201).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!existingTestimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const testimonial = await prisma.testimonial.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        clientName:
          req.body.clientName || existingTestimonial.clientName,

        designation:
          req.body.designation || existingTestimonial.designation,

        company:
          req.body.company || existingTestimonial.company,

        message:
          req.body.message || existingTestimonial.message,

        isPublished:
          req.body.isPublished !== undefined
            ? req.body.isPublished === "true"
            : existingTestimonial.isPublished,
      },
    });

    res.status(200).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    await prisma.testimonial.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};