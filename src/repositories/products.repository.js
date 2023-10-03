import { productDao } from "../dao/mongo/index.js";

export default class ProductsRepository {
    getProducts = async (options) => {
        try {
            const products = await productDao.getProducts(options);
            return products;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    getProductById = async (id) => {
        try {
            const product = await productDao.getProductById(id);
            return product;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    addProduct = async (product) => {
        try {
            const result = await productDao.addProduct(product);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    updateProduct = async (id, changes) => {
        try {
            const result = await productDao.updateProduct(id, changes);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    deleteProduct = async (id) => {
        try {
            const result = await productDao.deleteProduct(id);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}
