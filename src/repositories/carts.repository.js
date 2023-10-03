import { cartDao } from "../dao/mongo/index.js";

export default class CartsRepository {
    getCarts = async () => {
        try {
            const carts = await cartDao.getCarts();
            return carts;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    getCartById = async (id) => {
        try {
            const cart = await cartDao.getCartById(id);
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    addCart = async (cart) => {
        try {
            const result = await cartDao.addCart(cart);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    cartHasProduct = async (cartId, productId) => {
        try {
            const result = await cartDao.cartHasProduct(cartId, productId);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    addProduct = async (cartId, productId, quantity) => {
        try {
            const result = await cartDao.addProduct(cartId, productId, quantity);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    addProducts = async (cartId, productId) => {
        try {
            const result = await cartDao.addProducts(cartId, productId);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    deleteProduct = async (cartId, productId) => {
        try {
            const result = await cartDao.deleteProduct(cartId, productId);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    deleteAllProducts = async (cartId) => {
        try {
            const result = await cartDao.deleteAllProducts(cartId);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    updateProductQuantity = async (cartId, productId, quantity) => {
        try {
            const result = await cartDao.updateProductQuantity(
                cartId,
                productId,
                quantity
            );
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}
