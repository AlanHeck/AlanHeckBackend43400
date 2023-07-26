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
    try {
      const productPrev = await this.getProducts();
      const nuevoArrayConProductoEliminado = productPrev.filter(
        (p) => p.id !== id
      );
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(nuevoArrayConProductoEliminado)
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductManager;


//cuerpos de productos
const producto1 = {
  title: "1er producto prueba",
  description: "este es un 1er producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25,
};
const producto2 = {
  title: "2do producto prueba",
  description: "este es un 2do producto prueba",
  price: 300,
  thumbnail: "sin imagen",
  code: "abc111",
  stock: 30,
};
const producto3 = {
  title: "3er producto prueba",
  description: "este es un 3er producto prueba",
  price: 400,
  thumbnail: "sin imagen",
  code: "abc112",
  stock: 10,
};
const objModif = {
  title: "2do producto modificado",
  description: "este es un 2do producto prueba que se modifico",
};

//Ejecucion
async function prueba() {
  try {
    const manager = new ProductManager("productos.json");
    
    // Agregar los productos con las validaciones
    const addedProduct1 = await manager.addProduct(producto1);
    console.log("Producto agregado:", addedProduct1);

    const addedProduct2 = await manager.addProduct(producto2);
    console.log("Producto agregado:", addedProduct2);

    const addedProduct3 = await manager.addProduct(producto3);
    console.log("Producto agregado:", addedProduct3);
    
    // Obtener todos los productos
    const products = await manager.getProducts();
    console.log("Productos:", products);
    
    // Obtener producto por ID
    const productoId = await manager.getProductById(1);
    console.log("Producto con ID 1:", productoId);
    
    // Actualizar producto
    await manager.updateProduct(2, objModif);
    const getProductosConP2Modificado = await manager.getProductById(2);
    console.log("Producto con ID 2 modificado:", getProductosConP2Modificado);
    
    // Eliminar producto
    await manager.deleteProduct(3);
    const getProductosSinProducto3 = await manager.getProducts();
    console.log("Productos sin ID 3:", getProductosSinProducto3);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

prueba();
