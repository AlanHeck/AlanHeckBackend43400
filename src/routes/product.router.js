import { Router } from "express";
import ProductManager from "../dao/dbManagers/products.js";
import { uploader } from "../utils.js";

const router = Router();
const manager = new ProductManager();

router.get("/", async (req, res) => {
  const { limit } = req.query;

  const products = await manager.getProducts();

  if (!limit) {
    return res.send({ products: products });
  }

  const limitedProducts = products.slice(0, limit);

  return res.send({ products: limitedProducts });
});

router.get("/:pid", async (req, res) => {
  const productId = req.params.pid;
  const product = await manager.getProductById(productId);

  if (!product) {
    return res
      .status(404)
      .send({ status: "Error", error: "product was not found" });
  }
  return res.send({
    status: "sucess",
    message: "product found",
    payload: product,
  });
});

router.post("/", uploader.array("thumbnails", 5), async (req, res) => {
  const product = req.body;
  const files = req.files;

  if (!product) {
    return res.status(400).send({
      status: "Error",
      error: "Error, the product could not be added",
    });
  }

  product.thumbnails = [];

  if (files) {
    files.forEach((file) => {
      const imageUrl = `http://localhost:8080/images/${file.filename}`;
      product.thumbnails.push(imageUrl);
    });
  }

  await manager.addProduct(product);
  return res.send({ status: "OK", message: "Product successfully added" });
});

router.put("/:pid", async (req, res) => {
  const productId = req.params.pid;
  const changes = req.body;

  const updatedProduct = await manager.updateProduct(productId, changes);

  if (!updatedProduct) {
    return res
      .status(404)
      .send({ status: "Error", error: "product was not found" });
  }
  return res.send({
    status: "OK",
    message: "Product succesfully updated",
  });
});

router.delete("/:pid", async (req, res) => {
  const productId = req.params.pid;
  const deletedProduct = await manager.deleteProduct(productId);

  if (!deletedProduct) {
    return res
      .status(404)
      .send({ status: "Error", error: "Product does not exist" });
  }
  return res.send({ status: "OK", message: "Product deleted successfully" });
});

export default router;
