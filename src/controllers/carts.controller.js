import { cartsService } from "../services/index.js";
import logger from '../winston.js';

export const getCarts = async (req, res, next) => {
    try {
        const carts = await cartsService.getCarts();
        return res.send({ status: "success", payload: carts });
    } catch (error) {
        next(error);
    }
};

export const getCartById = async (req, res, next) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId);

        if (!cart) {
            return res.status(404).send({
                status: "Error",
                error: "cart was not found",
            });
        }
        return res.send({ status: "OK", message: "Cart found", payload: cart });
    } catch (error) {
        logger.error({
            message: 'Error getting user cart',
            userId: req.user._id,
            error: error.message,
        });
        next(error);
    }
};

export const addCart = async (req, res, next) => {
    try {
        const cart = req.body;
        if (!cart) {
            return res
                .status(400)
                .send({ status: "Error", error: "Cart could not be added" });
        }

        const newCart = await cartsService.addCart(cart);
        return res.send({
            status: "OK",
            message: "Cart added successfully",
            payload: newCart,
        });
    } catch (error) {
        logger.error(`Error creating cart: ${error.message}`);
        res.status(500).json({ message: "Error creating cart" });
        next(error);
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;

        const productOwner = await productsService.getProductOwner(productId);
        if (req.user.role === "premium" && productOwner === req.user.email) {
            return res.status(403).send({
                status: "Error",
                error: "Permission denied. Premium users cannot add their own products to the cart.",
            });
        }
        const newProduct = await cartsService.addProduct(cartId, productId, quantity);
        return res.send({
            status: "OK",
            message: "Product successfully added to the cart",
            payload: newProduct,
        });
    } catch (error) {
        logger.error(`Error adding product to the cart: ${error.message}`);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
        next(error);
    }
};

export const addProducts = async (req, res, next) => {
    try {
        const cartId = req.params.cid;
        const products = req.body;

        const productOwners = await productsService.getProductsOwners(products);

        if (req.user.role === "premium" && productOwners.includes(req.user.email)) {
            return res.status(403).send({
                status: "Error",
                error: "Permission denied. Premium users cannot add their own products to the cart.",
            });
        }

        const updatedCart = await cartsService.addProducts(cartId, products);

        return res.send({
            status: "OK",
            message: "Products successfully added to the cart",
            payload: updatedCart,
        });
    } catch (error) {
        logger.error(`Error adding products to the cart: ${error.message}`);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await cartsService.deleteProduct(cartId, productId);

        if (!updatedCart)
            return res
                .send(404)
                .send({ status: "error", error: "product was not found" });

        return res.send({ status: "sucess", message: "product deleted from cart" });
    } catch (error) {
        logger.error(`Error when removing product from cart: ${error.message}`);
        res.status(500).json({ status: 'error', message: error.message });
        next(error);
    }
};

export const deleteProducts = async (req, res, next) => {
    try {
        const cartId = req.params.cid;

        const updatedCart = await cartsService.deleteAllProducts(cartId);

        if (!updatedCart)
            return res.status(404).send({ status: "error", error: "cart not found" });

        return res.send({
            status: "sucess",
            message: "deleted all products from cart",
        });
    } catch (error) {
        logger.error(`error when deleting products: ${error.message}`);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
        next(error);
    }
};

export const updateProductQuantity = async (req, res, next) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;

        const updatedCart = await cartsService.updateProductQuantity(
            cartId,
            productId,
            quantity
        );

        if (!updatedCart)
            return res.status(400).send({ status: "error", error: "error" });

        return res.send({ status: "sucess", message: "cart updated" });
    } catch (error) {
        next(error);
    }
};

export const createPurchase = async (req, res, next) => {
    try {
        const cartId = req.params.cid;
        const currentUser = req.user.email;
        const result = await cartsService.createPurchase(cartId, currentUser);
        return res.send({ status: "success", result });
    } catch (error) {
        next(error);
    }
};