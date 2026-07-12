import express from "express";

import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getHomeProjects,
  getOfficeProjects,
} from "../controllers/project.controller.js";
import { isAuth, isAdmin } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.get("/getProjects", getProjects);
router.get("/getProjectById/:id", getProjectById);

router.post(
  "/createProject",
  isAuth,
  isAdmin,
  upload.array("images", 10),
  createProject
);

router.put(
  "/updateProject/:id",
  isAuth,
  isAdmin,
  upload.array("images", 10),
  updateProject
);

router.delete("/deleteProject/:id", deleteProject);
router.get("/getHomeProjects", getHomeProjects);
router.get("/getOfficeProjects", getOfficeProjects);

export default router;