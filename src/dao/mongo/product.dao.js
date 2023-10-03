import productsModel from "../models/products.js";

export default class Product {
    constructor() { }

    getProducts = async (options) => {
        try {
            const { query, pagination } = options;
            const paginatedProducts = await productsModel.paginate(query, pagination);
            return paginatedProducts;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    addProduct = async (product) => {
        try {
            const result = await productsModel.create(product);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    getProductById = async (id) => {
        try {
            const product = await productsModel.findOne({ _id: id }).lean();
            return product;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    updateProduct = async (id, changes) => {
        try {
            const updatedProduct = await productsModel.updateOne(
                { _id: id },
                changes
            );
            return updatedProduct;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    deleteProduct = async (id) => {
        try {
            const deletedProduct = await productsModel.deleteOne({ _id: id });
            return deletedProduct;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}
