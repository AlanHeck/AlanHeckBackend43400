import { DatabaseAccessError } from "../../errors/DataBaseAccessError.js";
import cartsModel from "../models/carts.js";
import ticketsModel from "../models/tickets.js";

export default class Cart {
    constructor() { }

    getCarts = async () => {
        try {
            const carts = await cartsModel.find();
            return carts;
        } catch (error) {
            throw new DatabaseAccessError("cartsModel", "read", error)
        }
    };

    getCartById = async (id) => {
        try {
            const cart = await cartsModel
                .findOne({ _id: id })
                .populate("products.product")
                .lean();
            return cart;
        } catch (error) {
            throw new DatabaseAccessError("cartsModel", "read", error)
        }
    };

    addCart = async (cart) => {
        try {
            const createdCart = cartsModel.create(cart);
            return createdCart;
        } catch (error) {
            throw new DatabaseAccessError("cartsModel", "create", error)
        }
    };

    cartHasProduct = async (cartId, productId) => {
        try {
            const cartHasProduct = await cartsModel.findOne({
                _id: cartId,
                products: { $elemMatch: { product: productId } },
            });
            return cartHasProduct;
        } catch (error) {
            throw new DatabaseAccessError("cartsModel", "read", error)
        }
    };

    addProduct = async (cartId, productId, quantity) => {
        try {
            const updatedCart = await cartsModel.updateOne(
                { _id: cartId },
                { $push: { products: [{ product: productId, quantity }] } }
            );
            return updatedCart;
        } catch (error) {
            throw new DatabaseAccessError("cartsModel", "update", error)
        }
    };

    addProducts = async (cartId, products) => {
        try {
            const updatedCart = await cartsModel.updateOne(
                { _id: cartId },
                { $set: { products } }
            );
            return updatedCart;
        } catch (error) {
            throw new DatabaseAccessError("cartsModel", "update", error)
        }
    };

    deleteProduct = async (cartId, productId) => {
        try {
            const updatedCart = await cartsModel.updateOne(
                { _id: cartId },
                { $pull: { products: { product: productId } } }
            );
            return updatedCart;
        } catch (error) {
            throw new DatabaseAccessError("cartsModel", "delete", error)
        }
    };

    deleteAllProducts = async (cartId) => {
        try {
            const updatedCart = await cartsModel.updateMany(
                { _id: cartId },
                { $set: { products: [] } },
                { multi: true }
            );
            return updatedCart;
        } catch (error) {
            throw new DatabaseAccessError("cartsModel", "delete", error)
        }
    };

    updateProductQuantity = async (cartId, productId, quantity) => {
        try {
            const updatedCart = await cartsModel.updateOne(
                { _id: cartId },
                { $inc: { "products.$[elem].quantity": quantity } },
                { arrayFilters: [{ "elem.product": productId }] }
            );
            return updatedCart;
        } catch (error) {
            throw new DatabaseAccessError("cartsModel", "update", error)
        }
    };

    createPurchase = async (ticket) => {
        try {
            const result = await ticketsModel.create(ticket);
            return result;
        } catch (error) {
            throw new DatabaseAccessError("ticketsModel", "create", error)
        }
    };
}