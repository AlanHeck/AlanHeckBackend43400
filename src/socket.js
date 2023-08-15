import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";

const socket = {};

socket.connect = (server) => {
    socket.io = new Server(server);

    socket.io.on("connection", (socket) => {
        console.log(`Cliente conectado: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado`);
        });

        socket.on('create_product', (newProduct) => {
            const productManager = new ProductManager()
            productManager.addProduct(newProduct);
        });

        socket.on('delete_product', (productId) => {
            const productManager = new ProductManager()
            productManager.deleteProduct(Number(productId));
        });
    });

};

export default socket;