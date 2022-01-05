const router = require("express").Router();
const { createReservoir, getReservoir } = require("../controllers/Reservoir");

router.route("/reservoir").post(createReservoir).get(getReservoir);

module.exports = router;
