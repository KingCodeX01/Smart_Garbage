const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { promise } = require("bcrypt/promises");
const prisma = new PrismaClient();

module.exports.Pickup = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        pickup_date,
        pickup_time,
        phone_no,
        alt_phone_no,
        location,
        type,
        // fk_user_id,
      } = data; // Include alt_phone_no in destructuring
      console.log(data);
      await prisma.garbage.create({
        data: {
          pickup_date: new Date(pickup_date), // Convert string to Date object
          pickup_time,
          phone_no: parseInt(phone_no), // Ensure phone_no is an integer
          alt_phone_no: alt_phone_no ? parseInt(alt_phone_no) : null, // Ensure alt_phone_no is an integer or null
          location,
          type,
          // fk_user: { connect: { id: parseInt(fk_user_id) } }, // Connect to the user by ID
        },
      });
      resolve({ success: true, message: "Request Sent Successfully" });
    } catch (err) {
      console.log(err);
      reject({ success: false, message: "Something Went Wrong" });
    }
  });
};

module.exports.GetGarbage = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Garbages = await prisma.garbage.findMany();
      resolve({
        success: true,
        data: Garbages,
        message: "Garbage Fetched Successfully",
      });
    } catch (err) {
      reject({ success: false, message: "Something went wrong" });
    }
  });
};

module.exports.GetName = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Users = await prisma.user.findUniqueOrThrow();
      resolve({
        success: true,
        data: Users,
        message: "UserName fetch Successfully",
      });
    } catch (err) {
      reject({ success: false, message: "something went wrong" });
    }
  });
};
