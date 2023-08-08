import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager();

const products = await productManager.getProducts();

router.get("/", async (req, res) => {
    res.render("home", { products, style: "styles.css", title: "Products" });
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realtime-products", {
        products,
        style: "styles.css",
        title: "Real Time Products",
    });
});

export default router;