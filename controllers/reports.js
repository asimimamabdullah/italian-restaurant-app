const Orders = require("../models/Orders");

exports.reports = async (req, res, next) => {
  try {
    var array = [];
    const or = await Orders.find(
      {},
      { createdAt: 1, email: 1, total: 1, name: 1, lastName: 1 },
      async (d, i) => {
        const arr = i.filter((item, i) => {
          return (
            parseInt(new Date(item.createdAt).getMonth()) + 1 ===
            parseInt(req.params.month)
          );
        });

        array = await arr;
      }
    );

    if (array.length === 0)
      return res
        .status(500)
        .json({ success: false, error: "No data found for this month" });

    return res.status(200).json({ success: true, array });
  } catch (error) {
    next(error);
  }
};
