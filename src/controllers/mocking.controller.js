import {faker} from "@faker-js/faker";

class MockingController {
    constructor() { };

    getProducts = async (page, limit) => {
        const products = [];

        for (let i = 0; i < 100; i++) {
            products.push({
                id: i,
                title: faker.commerce.productName(),
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
                stock: faker.number.int(100)
            });
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        return products.slice(startIndex, endIndex);
    }

    showMocking = async (req, res) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const products = await this.getProducts(page, limit);

        const totalPages = Math.ceil(100 / limit);

        res.render('mockingproducts', {
            products: products,
            style: "styles.css",
            title: "MockingProducts",
            page: page,
            totalPages: totalPages,
            nextPage: page < totalPages ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null,
        });
    }
}

export default MockingController;