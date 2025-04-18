const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { promise } = require("bcrypt/promises");
const prisma = new PrismaClient();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const addTrash = async (data, files) => {
  console.log("Data received:", data);
  console.log("Files received:", files);

  try {
    const {
      trash_name,
      trash_description,
      trash_category,
      trash_price,
      trash_unit = "", // provide a default value if not supplied
    } = data;

    // Process files to save them or their metadata
    const trash_images = files.map((file) => ({
      filename: file.filename, // Save the filename to database or use as needed
      // Optionally save other metadata like originalname, mimetype, size, etc.
    }));

    // Concatenate filenames into a single string for `trash_image`
    const trash_image = trash_images.map((image) => image.filename).join(",");

    // Example: Saving to database using Prisma
    await prisma.gprice.create({
      data: {
        trash_name,
        trash_description,
        trash_category,
        trash_price: parseFloat(trash_price),
        trash_unit,
        trash_image, // Assign the concatenated filenames string to trash_image
      },
    });

    return { success: true, message: "Added successfully" };
  } catch (err) {
    console.error(err);
    throw new Error("Internal Server Error");
  }
};

module.exports.Update = async (req, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({ success: true, message: "" });
    } catch (err) {
      reject({ success: false, message: "" });
    }
  });
};

const getPrice = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Gprice = await prisma.gprice.findMany();
      resolve({
        success: true,
        data: Gprice,
        message: "Product Fetched Successfully",
      });
    } catch (err) {
      reject({ success: false, message: "Something went wrong" });
    }
  });
};

module.exports = {
  addTrash,
  getPrice,
};
