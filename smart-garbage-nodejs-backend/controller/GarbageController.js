const { Pickup, GetGarbage, GetName } = require("../services/GarbageService");

module.exports.Gpickup = async (req, res) => {
  try {
    const result = await Pickup(req.body);
    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Garbage Request Successful" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.GetGarbage = async (req, res) => {
  try {
    const result = await GetGarbage();
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

module.exports.GetName = async (req, res) => {
  try {
    const result = await GetName();
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

// module.exports.AddProduct = async (req, res) => {
//   try {
//     const result = await this.AddProduct();
//     if (result) {
//       return res.status(200).json({ success: true, data: result });
//     }
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error " });
//   }
// };
