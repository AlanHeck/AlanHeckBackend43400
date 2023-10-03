import { cartsService } from "../services/index.js";

export const getCarts = async (req, res) => {
    try {
        const carts = await cartsService.getCarts();
        return res.send({ status: "success", payload: carts });
    } catch (error) {
        console.log(error);
    }
};

export const getCartById = async (req, res) => {
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
        console.log(error);
    }
};

export const addCart = async (req, res) => {
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
        console.log(error);
    }
};

export const addProduct = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const { quantity } = req.body;

        const newProduct = await cartsService.addProduct(
            cartId,
            productId,
            quantity
        );

        if (!newProduct) {
            return res
                .status(404)
                .send({ status: "Error", error: "Product could not be found" });
        }
        return res.send({
            status: "OK",
            message: "Product successfully added to the cart",
            payload: newProduct,
        });
    } catch (error) {
        console.log(error);
    }
};

export const addProducts = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const products = req.body;

        const updatedCart = await cartsService.addProducts(cartId, products);
        if (!updatedCart)
            return res.status(400).send({ status: "error", error: "error" });

        return res.send({ status: "sucess", message: "cart updated" });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (req, res) => {
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
        console.log(error);
    }
};

export const deleteProducts = async (req, res) => {
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
        console.log(error);
    }
};

export const updateProductQuantity = async (req, res) => {
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
        console.log(error);
    }
};
