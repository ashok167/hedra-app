import prisma from '../config/db.js';

export const getProjects = async (req, res) => {
  try {
    const { type } = req.query;

    const projects = await prisma.project.findMany({
      where: type
        ? {
            projectType: type,
          }
        : {},
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(project);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const imageUrls = req.files
      ? req.files.map(file => `/uploads/${file.filename}`)
      : [];

    const project = await prisma.project.create({
      data: {
        projectType: req.body.projectType,
        title: req.body.title,
        description: req.body.description,
        client: req.body.client,
        year: req.body.year,

        // String field
        imageUrl: JSON.stringify(imageUrls),
      },
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateProject = async (req, res) => {
  try {
    const updateData = {
      projectType: req.body.projectType,
      title: req.body.title,
      description: req.body.description,
      client: req.body.client,
      year: req.body.year,
    };

   let existingImages = [];

try {
  existingImages = JSON.parse(
    req.body.existingImages || "[]"
  );
} catch {
  existingImages = [];
}

const newImages =
  req.files?.map(
    (file) => `/uploads/${file.filename}`
  ) || [];

updateData.imageUrl = JSON.stringify([
  ...existingImages,
  ...newImages,
]);

    const project = await prisma.project.update({
      where: {
        id: req.params.id,
      },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await prisma.project.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getHomeProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        projectType: "Home",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOfficeProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        projectType: "Office",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};