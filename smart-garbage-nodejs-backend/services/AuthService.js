const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { promise } = require("bcrypt/promises");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
// require("dotenv").config();
const saltRounds = 10;

module.exports.Register = (data) => {
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      //   console.log(req.body);
      console.log(data);
      const created_date = new Date();
      const oldUser = await prisma.user.findFirst({
        select: { email: true },
        where: { email: data.email },
      });

      if (oldUser) {
        reject({ success: false, message: "User already exists" });
      }

      if (data.password != data.confirm_password) {
        reject({ message: "Password doesn't matches", success: false });
      }
      // } else {
      //   const hashedPass = new Promise((resolve, reject) => {
      //     try {
      //       bcrypt.genSalt(saltRounds, function (err, salt) {
      //         bcrypt.hash(
      //           registerData.password,
      //           salt,
      //           function (err, hash) {
      //             resolve(hash);
      //           }
      //         );
      //       });
      //     } catch (err) {
      //       reject({ message: "Some problem occured", success: false });
      //     }
      //   });

      const { email, password, ...rest } = data;

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          created_at: created_date, // Corrected property name
          updated_at: created_date, // Corrected property name
          ...rest,
        },
      });
      resolve({ success: true, message: "Signup successful" });
    } catch (error) {
      console.error("Error creating user:", error);
      reject({ success: false, message: "Signup failed" });
    }
  });

  return myPromise;
};

module.exports.Login = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(req);
      const { email, password } = req;
      if (!email || !password) {
        reject({
          success: false,
          message: "Email and password are required",
        });
        return;
      }

      const user = await prisma.user.findFirst({
        select: { id: true, email: true, password: true, full_name: true },
        where: { email: email },
      });

      if (user) {
        const passCheck = await bcrypt.compare(password, user.password);
        if (passCheck) {
          const token = jwt.sign(
            {
              id: user.id,
              full_name: user.full_name,
              email: user.email,
            },
            process.env.JWT_SECRECT_KEY,
            {
              expiresIn: "1h",
            }
          );
          resolve({
            token: token,
            success: true,
            data: { id: user.id, full_name: user.full_name, email: user.email },
            message: "Login Successfully",
          });
        } else {
          reject({
            success: false,
            message: "Invalid credentials",
          });
        }
      } else {
        reject({
          success: false,
          message: "Invalid credentials",
        });
      }
    } catch (err) {
      console.error(err);
      reject({
        success: false,
        message: "Error logging in",
      });
    }
  });
};

module.exports.AdminLogin = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const { email, password } = data;
      if (!email || !password) {
        reject({
          success: false,
          message: "Email and password are required",
        });
        return;
      }

      const user = await prisma.admin.findFirst({
        select: { id: true, email: true, password: true },
        where: { email: email },
      });

      if (user) {
        const passCheck = await bcrypt.compare(password, user.password);
        if (passCheck) {
          const token = jwt.sign(
            {
              id: user.id,
              // full_name: user.full_name,
              email: user.email,
            },
            process.env.JWT_SECRECT_KEY,
            {
              expiresIn: "1h",
            }
          );
          resolve({
            token: token,
            success: true,
            data: { id: user.id, email: user.email },
            message: "Login Successfully",
          });
        } else {
          reject({
            success: false,
            message: "Invalid credentials",
          });
        }
      } else {
        reject({
          success: false,
          message: "Invalid credentials",
        });
      }
    } catch (err) {
      console.error(err);
      reject({
        success: false,
        message: "Error logging in",
      });
    }
  });
};

module.exports.GetUser = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const User = await prisma.user.findMany();
      resolve({
        success: true,
        data: User,
        message: "User data Fetched Successfully",
      });
    } catch (err) {
      reject({ success: false, message: "Something went wrong" });
    }
  });
};

module.exports.ChangePassword = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password, new_password } = data;
      console.log(
        `Received data - Email: ${email}, Password: ${password}, New Password: ${new_password}`
      );

      console.log(email, password, new_password);
      if (!email || !password || !new_password) {
        reject({
          success: false,
          message: "Email and passwords are required",
        });
      }
      const user = await prisma.user.findFirst({
        select: { email: true, password: true },
        where: { email: email },
      });

      if (!user) {
        reject({
          success: false,
          message: "User not found",
        });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(`Password match: ${isMatch}`);
      if (!isMatch) {
        resolve({ success: false, message: "Incorrect old password" });
        return;
      }

      const hashedNewPassword = await bcrypt.hash(new_password, saltRounds);
      console.log(hashedNewPassword);
      console.log(`Hashed new password: ${hashedNewPassword}`);
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          password: hashedNewPassword,
          confirm_password: hashedNewPassword,
        },
      });
      console.log(`Updated user: ${JSON.stringify(updatedUser)}`);
      resolve({ success: true, message: "Password changed successfully" });
    } catch (error) {
      console.error(error);
      reject({ success: false, message: "Internal server error" });
    }
  });
};
