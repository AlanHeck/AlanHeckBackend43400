import cartsModel from "../models/carts.js";

export default class CartManager {
    constructor() { }

    getCarts = async () => {
        try {
            const carts = await cartsModel.find();
            return carts;
        } catch (error) {
            console.log(error);
        }
    };

    getCartById = async (id) => {
        try {
            const cart = await cartsModel
                .findOne({ _id: id })
                .populate("products.product");
            return cart;
        } catch (error) {
            console.log(error);
        }
    };

    addCart = async (cart) => {
        try {
            const createdCart = cartsModel.create(cart);
            return createdCart;
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    };


}
