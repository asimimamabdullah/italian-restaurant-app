const router = require("express").Router();
const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/Products");
const { protect } = require("../middleware/protect");
const { adminAuth } = require("../middleware/AdminAuth");

router
  .route("/products")
  .get(getProducts)
  .post(protect, adminAuth, createProduct);

router
  .route("/product/:id")
  .delete(protect, adminAuth, deleteProduct)
  .put(protect, adminAuth, updateProduct);

module.exports = router;
