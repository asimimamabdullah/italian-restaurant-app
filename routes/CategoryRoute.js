const router = require("express").Router();

const {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/Category");
const { adminAuth } = require("../middleware/AdminAuth");
const { protect } = require("../middleware/protect");

router
  .route("/category")
  .get(getCategories)
  .post(protect, adminAuth, createCategory);

router.route("/category/:id").delete(deleteCategory).patch(updateCategory);

module.exports = router;
