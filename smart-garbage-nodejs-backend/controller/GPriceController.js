const { addTrash, Update, getPrice } = require("../services/GPriceService");

module.exports.Store = async (req, res) => {
  try {
    const result = await addTrash(req.body, req.files);
    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Price Stored Successful" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.GetPrice = async (req, res) => {
  try {
    const result = await getPrice();
    if (result) {
      return res.status(200).json({ success: true, data: result });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.Update = async (req, res) => {
  try {
    const result = await Update(req.body, req.params.id);
    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Signup Successful" });
    }
    return res
      .status(409)
      .json({ success: true, message: "User already exists" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
