const router = require("express").Router();
const { uploadImage, destroyImage } = require("../controllers/upload");
const { adminAuth } = require("../middleware/AdminAuth");
const { protect } = require("../middleware/protect");

router.route("/upload").post(uploadImage);
router.route("/destroy").post(protect, adminAuth, destroyImage);

module.exports = router;
