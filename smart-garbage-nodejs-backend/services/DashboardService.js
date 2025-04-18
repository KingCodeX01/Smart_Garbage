const { PrismaClient } = require("@prisma/client");
const { promise } = require("bcrypt/promises");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

module.exports.getData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Guser = await prisma.user.count();
      const Ggarbage = await prisma.garbage.count();
      const Gproduct = await prisma.gprice.count();
      resolve({
        success: true,
        data: { Guser, Ggarbage, Gproduct },
        message: "Fetch successfully",
      });
    } catch (err) {
      console.log(err);
      reject({ success: false, message: "fetch unsuccessful" });
    }
  });
};
