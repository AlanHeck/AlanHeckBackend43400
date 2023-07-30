const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(limit) {
    try {
      if (fs.existsSync(this.path)) {
        const infoProducts = await fs.promises.readFile(this.path, "utf-8");
        const allProducts = JSON.parse(infoProducts);

        if (limit && Number.isInteger(limit) && limit > 0) {
          return allProducts.slice(0, limit);
        } else {
          return allProducts;
        }
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

  async addProduct(objProduct) {
    try {
      const productsPrev = await this.getProducts();

      // Validar que todas las propiedades necesarias estén presentes
      if (
        !objProduct.title ||
        !objProduct.description ||
        !objProduct.price ||
        !objProduct.thumbnail ||
        !objProduct.code ||
        !objProduct.stock
      ) {
        throw new Error("Faltan propiedades del producto");
      }

      // Validar que el código (code) no se repita en otros productos
      if (productsPrev.some((p) => p.code === objProduct.code)) {
        throw new Error("El código del producto ya existe");
      }

      let id;
      if (!productsPrev.length) {
        id = 1;
      } else {
        id = productsPrev[productsPrev.length - 1].id + 1;
      }

      const newProduct = { ...objProduct, id };
      productsPrev.push(newProduct);

      await fs.promises.writeFile(this.path, JSON.stringify(productsPrev));
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const productPrev = await this.getProducts();
      const product = productPrev.find((p) => p.id === id);
      if (!product) {
        throw new Error("Producto con el id no encontrado");
      } else {
        return product;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, obj) {
    try {
      const productPrev = await this.getProducts();
      const productoPorSuIndex = productPrev.findIndex((p) => p.id === id);
      if (productoPorSuIndex === -1) {
        throw new Error("No hay producto con ese id");
      } else {
        // Validar que el código (code) no se repita en otros productos
        if (
          obj.code &&
          productPrev.some((p) => p.code === obj.code && p.id !== id)
        ) {
          throw new Error("El código del producto ya existe");
        }

        const product = productPrev[productoPorSuIndex];
        productPrev[productoPorSuIndex] = { ...product, ...obj };
        await fs.promises.writeFile(this.path, JSON.stringify(productPrev));
        return productPrev[productoPorSuIndex];
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {

    const productPrev = await this.getProducts();
    if (!productPrev.some(product => product.id === id)) {
      throw new Error(`el producto con el id ${id} no puede ser eliminado porque no existe`)
    }
    const nuevoArrayConProductoEliminado = productPrev.filter(
      (p) => p.id !== id
    );
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(nuevoArrayConProductoEliminado)
    );


  }
}

module.exports = ProductManager;


