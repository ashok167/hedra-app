import prisma from "../config/db.js";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json(blog);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createBlog = async (req, res) => {
  try {
    const imageUrls = req.files
      ? req.files.map(
          (file) => `/uploads/${file.filename}`
        )
      : [];

    const blog = await prisma.blog.create({
      data: {
        title: req.body.title,
        slug: generateSlug(req.body.title),
        author: req.body.author,
        tag: req.body.tag,
        content: req.body.content,
        isPublished:
          req.body.isPublished === "true",

        images: imageUrls,
      },
    });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const existingBlog =
      await prisma.blog.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

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

    const updateData = {
      title:
        req.body.title || existingBlog.title,

      slug: req.body.title
        ? generateSlug(req.body.title)
        : existingBlog.slug,

      author:
        req.body.author ||
        existingBlog.author,

      tag:
        req.body.tag || existingBlog.tag,

      content:
        req.body.content ||
        existingBlog.content,

      isPublished:
        req.body.isPublished !== undefined
          ? req.body.isPublished === "true"
          : existingBlog.isPublished,

      images: [
        ...existingImages,
        ...newImages,
      ],
    };

    const blog = await prisma.blog.update({
      where: {
        id: Number(req.params.id),
      },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await prisma.blog.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};