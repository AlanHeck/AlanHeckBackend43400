const express = require("express");
const app = express();
const ProductManager = require("./ProductManager"); // Actualiza la ruta si ProductManager.js está en una carpeta diferente

const manager = new ProductManager("productos.json");



// Endpoint para obtener todos los productos con el parámetro de consulta opcional "limit"
app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await manager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener un producto específico por su ID
app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await manager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log("Servidor ejecutándose en el puerto", 8080);
});
