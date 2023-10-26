import { productsRepository } from "../repositories/index.js";

export default class ProductsService {
    getProducts = async (options) => {
        try {
            const products = await productsRepository.getProducts(options);
            return products;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    getProductById = async (id) => {
        try {
            const product = await productsRepository.getProductById(id);
            return product;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    addProduct = async (product) => {
        try {
            const result = await productsRepository.addProduct(product);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    updateProduct = async (id, changes) => {
        try {
            const result = await productsRepository.updateProduct(id, changes);
            return result;
        } catch (error) {
throw error
        }
    };

    deleteProduct = async (id) => {
        try {
            const result = await productsRepository.deleteProduct(id);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}
