const express = require("express");
const router = express.Router();
const { adminAuth } = require("../middleware/AdminAuth");
const { protect } = require("../middleware/protect");
const { reports } = require("../controllers/reports");

router.route("/dashboard/reports/:month").get(protect, adminAuth, reports);

module.exports = router;
