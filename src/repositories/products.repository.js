import { DatabaseAccessError } from "../errors/DatabaseAccessError.js";
import { productDao } from "../dao/mongo/index.js";

export default class ProductsRepository {
    getProducts = async (options) => {
        try {
            const products = await productDao.getProducts(options);
            return products;
        } catch (error) {
            throw new DatabaseAccessError("products", "getProducts", "Unable to fetch products", error);
        }
    };

    getProductById = async (id) => {
        try {
            const product = await productDao.getProductById(id);
            return product;
        } catch (error) {
            throw new DatabaseAccessError("products", "getProductById", `Unable to fetch product with ID ${id}`, error);
        }
    };

    addProduct = async (product) => {
        try {
            const result = await productDao.addProduct(product);
            return result;
        } catch (error) {
            throw new DatabaseAccessError("products", "addProduct", "Unable to add product", error);
        }
    };

    updateProduct = async (id, changes) => {
        try {
            const result = await productDao.updateProduct(id, changes);
            return result;
        } catch (error) {
            throw new DatabaseAccessError("products", "updateProduct", `Unable to update product with ID ${id}`, error);
        }
    };

    deleteProduct = async (id) => {
        try {
            const result = await productDao.deleteProduct(id);
            return result;
        } catch (error) {
            throw new DatabaseAccessError("products", "deleteProduct", `Unable to delete product with ID ${id}`, error);
        }
    };
}
