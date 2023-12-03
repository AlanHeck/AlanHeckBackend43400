import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integración para módulo de productos", function () {
    let productId;

    describe("Set de pruebas para POST /api/products", function () {
        const productMock = {
            title: "Product1",
            price: 19.99,
            category: "Electronics",
            description: "Product description",
            code: "P001",
            status: true,
            stock: 50,
        };

        it("POST /api/products: Debe crear un producto correctamente", async function () {
            const { body } = await requester.post("/api/products").send(productMock);
            productId = body._id;
            expect(body).to.have.property("_id");
            expect(body.title).to.equal(productMock.title);
            expect(body.price).to.equal(productMock.price);
            expect(body.category).to.equal(productMock.category);
            expect(body.description).to.equal(productMock.description);
            expect(body.code).to.equal(productMock.code);
            expect(body.status).to.equal(productMock.status);
            expect(body.stock).to.equal(productMock.stock);
        });
    });

    describe("Set de pruebas para GET /api/products", function () {
        it("GET /api/products: Debe obtener la lista de productos", async function () {
            const result = await requester.get("/api/products");
            expect(result.status).to.be.eql(200);
            expect(result.body).to.be.an('array');
        });
    });

    describe("Set de pruebas para PUT /api/products/:pid", function () {
        const updatedProductData = {
            title: "UpdatedProduct",
            price: 29.99,
            category: "UpdatedCategory",
            description: "Updated description",
            code: "P002",
            status: false,
            stock: 25,
        };

        it("PUT /api/products/:pid: Debe actualizar un producto existente", async function () {
            const result = await requester.put(`/api/products/${productId}`).send(updatedProductData);
            expect(result.status).to.be.eql(200);
            expect(result.body).to.have.property("_id");
            expect(result.body.title).to.equal(updatedProductData.title);
            expect(result.body.price).to.equal(updatedProductData.price);
            expect(result.body.category).to.equal(updatedProductData.category);
            expect(result.body.description).to.equal(updatedProductData.description);
            expect(result.body.code).to.equal(updatedProductData.code);
            expect(result.body.status).to.equal(updatedProductData.status);
            expect(result.body.stock).to.equal(updatedProductData.stock);
        });

        it("PUT /api/products/:pid: Debe devolver 404 si el producto no existe", async function () {
            const result = await requester.put("/api/products/nonexistentid").send(updatedProductData);
            expect(result.status).to.be.eql(404);
        });
    });

    describe("Set de pruebas para DELETE /api/products/:pid", function () {
        it("DELETE /api/products/:pid: Debe eliminar un producto existente", async function () {
            const result = await requester.delete(`/api/products/${productId}`);
            expect(result.status).to.be.eql(200);
            expect(result.body).to.have.property("_id");
        });

        it("DELETE /api/products/:pid: Debe devolver 404 si el producto no existe", async function () {
            const result = await requester.delete("/api/products/nonexistentid");
            expect(result.status).to.be.eql(404);
        });
    });
});