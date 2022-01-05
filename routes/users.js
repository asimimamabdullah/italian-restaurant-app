const router = require("express").Router();
const { users } = require("../controllers/Users");
const { adminAuth } = require("../middleware/AdminAuth");
const { protect } = require("../middleware/protect");

router.route("/users").get(protect, adminAuth, users);

module.exports = router;
