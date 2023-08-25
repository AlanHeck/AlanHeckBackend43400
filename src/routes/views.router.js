import { Router } from "express";
import ProductManager from "../dao/dbManagers/products.js";
import MessageManager from "../dao/dbManagers/messages.js";

const router = Router();
const productManager = new ProductManager();
const messageManager = new MessageManager();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", { products, style: "styles.css", title: "Products" });
});

router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realtime-products", {
        products,
        style: "styles.css",
        title: "Real Time Products",
    });
});

router.get("/chat", async (req, res) => {
    const messages = await messageManager.getMessages();
    return res.render("messages");
});

export default router;
