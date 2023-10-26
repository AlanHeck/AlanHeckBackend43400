import { cartDao } from "../dao/mongo/index.js";

export default class CartsRepository {
    getCarts = async () => {
        try {
            const carts = await cartDao.getCarts();
            return carts;
        } catch (error) {
            throw error
        }
    };

    getCartById = async (id) => {
        try {
            const cart = await cartDao.getCartById(id);
            return cart;
        } catch (error) {
            throw error
        }
    };

    addCart = async (cart) => {
        try {
            const result = await cartDao.addCart(cart);
            return result;
        } catch (error) {
            throw error
        }
    };

    cartHasProduct = async (cartId, productId) => {
        try {
            const result = await cartDao.cartHasProduct(cartId, productId);
            return result;
        } catch (error) {
            throw error
        }
    };

    addProduct = async (cartId, productId, quantity) => {
        try {
            const result = await cartDao.addProduct(cartId, productId, quantity);
            return result;
        } catch (error) {
            throw error
        }
    };

    addProducts = async (cartId, productId) => {
        try {
            const result = await cartDao.addProducts(cartId, productId);
            return result;
        } catch (error) {
            throw error
        }
    };

    deleteProduct = async (cartId, productId) => {
        try {
            const result = await cartDao.deleteProduct(cartId, productId);
            return result;
        } catch (error) {
            throw error
        }
    };

    deleteAllProducts = async (cartId) => {
        try {
            const result = await cartDao.deleteAllProducts(cartId);
            return result;
        } catch (error) {
            throw error
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
            throw error
        }
    };

    createPurchase = async (ticket) => {
        try {
            const result = await cartDao.createPurchase(ticket);
            return result;
        } catch (error) {
            throw error
        }
    };
}