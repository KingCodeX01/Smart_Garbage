const { getData } = require("../services/DashboardService");

module.exports.GetData = async (req, res) => {
  try {
    const result = await getData(res);
    if (result) {
      return res.status(200).json({
        data: result,
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
