import { DatabaseAccessError } from "../errors/DatabaseAccessError.js";
import { cartDao } from "../dao/mongo/index.js";

export default class CartsRepository {
    getCarts = async () => {
        try {
            const carts = await cartDao.getCarts();
            return carts;
        } catch (error) {
            throw new DatabaseAccessError("carts", "getCarts", error);
        }
    };

    getCartById = async (id) => {
        try {
            const cart = await cartDao.getCartById(id);
            return cart;
        } catch (error) {
            throw new DatabaseAccessError("carts", "getCartById", error);
        }
    };

    addCart = async (cart) => {
        try {
            const result = await cartDao.addCart(cart);
            return result;
        } catch (error) {
            throw new DatabaseAccessError("carts", "addCart", error);
        }
    };

    cartHasProduct = async (cartId, productId) => {
        try {
            const result = await cartDao.cartHasProduct(cartId, productId);
            return result;
        } catch (error) {
            throw new DatabaseAccessError("carts", "cartHasProduct", error);
        }
    };

    addProduct = async (cartId, productId, quantity) => {
        try {
            const result = await cartDao.addProduct(cartId, productId, quantity);
            return result;
        } catch (error) {
            throw new DatabaseAccessError("carts", "addProduct", error);
        }
    };

    addProducts = async (cartId, productId) => {
        try {
            const result = await cartDao.addProducts(cartId, productId);
            return result;
        } catch (error) {
            throw new DatabaseAccessError("carts", "addProducts", error);
        }
    };

    deleteProduct = async (cartId, productId) => {
        try {
            const result = await cartDao.deleteProduct(cartId, productId);
            return result;
        } catch (error) {
            throw new DatabaseAccessError("carts", "deleteProduct", error);
        }
    };

    deleteAllProducts = async (cartId) => {
        try {
            const result = await cartDao.deleteAllProducts(cartId);
            return result;
        } catch (error) {
            throw new DatabaseAccessError("carts", "deleteAllProducts", error);
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
            throw new DatabaseAccessError("carts", "updateProductQuantity", error);
        }
    };

    createPurchase = async (ticket) => {
        try {
            const result = await cartDao.createPurchase(ticket);
            return result;
        } catch (error) {
            throw new DatabaseAccessError("carts", "createPurchase", error);
        }
    };
}
