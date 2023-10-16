import { Router } from "express";
import { passportCall, handlePolicies } from "../middlewares/authorization.js";
import {
  getCarts,
  getCartById,
  addCart,
  addProduct,
  addProducts,
  deleteProduct,
  deleteProducts,
  updateProductQuantity,
  createPurchase,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/", getCarts);
router.get("/:cid", getCartById);
router.post("/", addCart);
router.post("/:cid/product/:pid", addProduct);
router.post("/:cid", addProducts);
router.put("/:cid/product/:pid", updateProductQuantity);
router.delete("/:cid/product/:pid", deleteProduct);
router.delete("/:cid", deleteProducts);
router.post(
  "/:cid/purchase",
  passportCall("jwt"),
  handlePolicies(["USER"]),
  createPurchase
);

export default router;