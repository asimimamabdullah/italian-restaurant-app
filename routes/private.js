const express = require("express");
const { getPrivateData } = require("../controllers/private");
const { adminAuth } = require("../middleware/AdminAuth");
const { protect } = require("../middleware/protect");
const router = express.Router();

router.route("/").get(protect, getPrivateData);

module.exports = router;
