import { productsService } from "../services/index.js";

export const getProducts = async (req, res) => {
    const options = {
        query: {},
        pagination: {
            limit: req.query.limit ?? 10,
            page: req.query.page ?? 1,
            sort: {},
        },
    };

    if (req.query.category) {
        options.query.category = req.query.category;
    }

    if (req.query.status) {
        options.query.status = req.query.status;
    }

    if (req.query.sort) {
        options.pagination.sort.price = req.query.sort;
    }

    const {
        docs: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
    } = await productsService.getProducts(options);

    const link = "/products?page=";

    const prevLink = hasPrevPage ? link + prevPage : link + page;
    const nextLink = hasNextPage ? link + nextPage : link + page;

    return res.send({
        status: "sucess",
        payload: products,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasNextPage,
        hasPrevPage,
        prevLink,
        nextLink,
    });
};

export const getProductById = async (req, res) => {
    const productId = req.params.pid;
    const product = await productsService.getProductById(productId);

    if (!product) {
        return res
            .status(404)
            .send({ status: "Error", error: "product was not found" });
    }
    return res.send({
        status: "sucess",
        message: "product found",
        payload: product,
    });
};

export const addProduct = async (req, res) => {
    const product = req.body;
    const files = req.files;

    if (!product) {
        return res.status(400).send({
            status: "Error",
            error: "Error, the product could not be added",
        });
    }

    product.thumbnails = [];

    if (files) {
        files.forEach((file) => {
            const imageUrl = `http://localhost:8080/images/${file.filename}`;
            product.thumbnails.push(imageUrl);
        });
    }

    await productsService.addProduct(product);
    return res.send({ status: "OK", message: "Product successfully added" });
};

export const updateProduct = async (req, res) => {
    const productId = req.params.pid;
    const changes = req.body;

    const updatedProduct = await productsService.updateProduct(
        productId,
        changes
    );

    if (!updatedProduct) {
        return res
            .status(404)
            .send({ status: "Error", error: "product was not found" });
    }
    return res.send({
        status: "OK",
        message: "Product succesfully updated",
    });
};

export const deleteProduct = async (req, res) => {
    const productId = req.params.pid;
    const deletedProduct = await productsService.deleteProduct(productId);

    if (!deletedProduct) {
        return res
            .status(404)
            .send({ status: "Error", error: "Product does not exist" });
    }
    return res.send({ status: "OK", message: "Product deleted successfully" });
};
