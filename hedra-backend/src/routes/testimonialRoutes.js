import express from "express";

import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

const router = express.Router();

router.get("/getTestimonials", getTestimonials);

router.get("/getTestimonialById/:id", getTestimonialById);

router.post("/createTestimonial", createTestimonial);

router.put("/updateTestimonial/:id", updateTestimonial);

router.delete("/deleteTestimonial/:id", deleteTestimonial);

export default router;