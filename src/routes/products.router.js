import { Router } from "express";
import { uploader } from "../utils.js";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { handlePolicies } from "../middlewares/authorization.js";

const router = Router();

router.get("/", handlePolicies(["ADMIN"]), getProducts);
router.get("/:pid", handlePolicies(["ADMIN"]), getProductById);
router.post(
  "/",
  uploader.array("thumbnails", 5),
  handlePolicies(["ADMIN"]),
  addProduct
);
router.put("/:pid", handlePolicies(["ADMIN"]), updateProduct);
router.delete("/:pid", handlePolicies(["ADMIN"]), deleteProduct);

export default router;