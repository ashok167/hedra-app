import express from "express";

import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

import { isAuth, isAdmin } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// Get All Blogs
router.get("/getBlogs", getBlogs);

// Get Single Blog
router.get("/getBlogById/:id", getBlogById);

// Create Blog
router.post(
  "/createBlog",
  isAuth,
  isAdmin,
  upload.array("images", 10),
  createBlog
);

// Update Blog
router.put(
  "/updateBlog/:id",
  isAuth,
  isAdmin,
  upload.array("images", 10),
  updateBlog
);

// Delete Blog
router.delete(
  "/deleteBlog/:id",
  isAuth,
  isAdmin,
  deleteBlog
);

export default router;