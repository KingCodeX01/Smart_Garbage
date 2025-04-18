const {
  Register,
  Login,
  User,
  ChangePassword,
  GetUser,
  AdminLogin,
} = require("../services/AuthService");

module.exports.register = async (req, res) => {
  try {
    const result = await Register(req.body);
    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Signup Successful" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const result = await Login(req.body);
    console.log(result);
    if (result) {
      return res
        .status(200)
        .json({ success: true, data: result, message: "Login successful" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.adminLogin = async (req, res) => {
  try {
    console.log(req.body);
    const result = await AdminLogin(req.body);
    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Login successful" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.getuser = async (req, res) => {
  try {
    const result = await GetUser();
    if (result) {
      return res.status(200).json({ success: true, data: result });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.changepassword = async (req, res) => {
  try {
    console.log(req.body);
    const result = await ChangePassword(req.body);
    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Password change successful" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
