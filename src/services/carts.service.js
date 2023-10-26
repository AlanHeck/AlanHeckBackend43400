import { cartsRepository } from "../repositories/index.js";
import { faker } from "@faker-js/faker";
import { productsService } from "./index.js";

export default class CartsService {
    getCarts = async () => {
        try {
            const carts = await cartsRepository.getCarts();
            return carts;
        } catch (error) {
            throw error
        }
    };

    getCartById = async (id) => {
        try {
            const cart = await cartsRepository.getCartById(id);
            return cart;
        } catch (error) {
            throw error
        }
    };

    addCart = async (cart) => {
        try {
            const result = await cartsRepository.addCart(cart);
            return result;
        } catch (error) {
            throw error
        }
    };

    addProduct = async (cartId, productId, quantity) => {
        try {
            let result;
            // check if cartHasProduct
            const cartHasProduct = await cartsRepository.cartHasProduct(
                cartId,
                productId
            );

            if (cartHasProduct) {
                result = await cartsRepository.updateProductQuantity(
                    cartId,
                    productId,
                    quantity
                );
                return result;
            }

            result = await cartsRepository.addProduct(cartId, productId, quantity);
            return result;
        } catch (error) {
            throw error
        }
    };

    addProducts = async (cartId, productId) => {
        try {
            const result = await cartsRepository.addProducts(cartId, productId);
            return result;
        } catch (error) {
            throw error
        }
    };

    deleteProduct = async (cartId, productId) => {
        try {
            const result = await cartsRepository.deleteProduct(cartId, productId);
            return result;
        } catch (error) {
            throw error
        }
    };

    deleteAllProducts = async (cartId) => {
        try {
            const result = await cartsRepository.deleteAllProducts(cartId);
            return result;
        } catch (error) {
            throw error
        }
    };

    updateProductQuantity = async (cartId, productId, quantity) => {
        try {
            const result = await cartsRepository.updateProductQuantity(
                cartId,
                productId,
                quantity
            );
            return result;
        } catch (error) {
            throw error
        }
    };

    createPurchase = async (cartId, currentUser) => {
        try {
            const cart = await cartsRepository.getCartById(cartId);

            const { products } = cart;

            products.forEach(async (order) => {
                order.product.stock -= order.quantity;
                await productsService.updateProduct(order.product._id, order.product);
            });

            const ammount = products
                .filter((order) => order.product.stock > 0)
                .flatMap((order) => order.product.price * order.quantity)
                .reduce((sum, cur) => (sum += cur), 0);

            const ticket = {
                code: faker.string.alphanumeric({ casing: "upper", length: 7 }),
                ammount,
                purchaser: currentUser,
            };

            const result = await cartsRepository.createPurchase(ticket);

            return result;
        } catch (error) {
            throw error
        }
    };
}