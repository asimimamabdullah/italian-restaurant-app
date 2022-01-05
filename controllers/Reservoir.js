const ReservoirModel = require("../models/ReservoirModel");

const Reservoir = {
  createReservoir: async (req, res, next) => {
    const { time, date, persons, name, phone, email } = req.body;

    try {
      const table = await ReservoirModel.create({
        time,
        date,
        persons,
        name,
        phone,
        email,
      });

      res.status(200).json({ msg: "Reserved Your Seat, Successfully", table });
    } catch (err) {
      next(err);
    }
  },
  getReservoir: async (req, res, next) => {
    try {
      const tables = await ReservoirModel.find();
      if (!tables) return res.status(500).json({ msg: "No Reservoir Found" });

      res.status(200).json({ success: true, msg: "Success", tables });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = Reservoir;
