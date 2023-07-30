const ProductManager = require("./ProductManager")
const fs = require("fs")

//cuerpos de productos
const producto1 = {
    title: "1er producto prueba",
    description: "este es un 1er producto prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25,
};



function productosSonIguales(producto1, producto2) {
    return (producto1.id === producto2.id &&
        producto1.title === producto2.title &&
        producto1.stock === producto2.stock &&
        producto1.price === producto2.price &&
        producto1.description === producto2.description &&
        producto1.thumbnail === producto2.thumbnail &&
        producto1.code === producto2.code)
};

//Ejecucion
async function prueba() {
    try{

    eliminarArchivoJson();

    const manager = new ProductManager("productos-prueba.json");

    let products = await manager.getProducts();
    if (products.length !== 0) {
        throw new Error(`esperaba lista de productos vacia pero recibí ${JSON.stringify(products, null, "\t")}`);
    }
    const productoCreado = await manager.addProduct(producto1);
    products = await manager.getProducts();
    if (!products.some((product) => { return productosSonIguales(product, productoCreado) })) {
        throw new Error(`esperaba que el producto  ${JSON.stringify(productoCreado, null, "\t")}este en la lista de productos, pero no lo esta. La lista de contiene ${JSON.stringify(products, null, "\t")}`)
    }
    let productoConId = await manager.getProductById(productoCreado.id)
    if (!productosSonIguales(productoConId, productoCreado)) {
        throw new Error(`Esperaba que el producto ${JSON.stringify(productoCreado, null, "\t")} sea igual que el producto ${JSON.stringify(productoConId, null, "\t")} pero no lo son`)
    }
    const productoActualizado = await manager.updateProduct(productoConId.id, { stock: 50 })
    if (!productosSonIguales(productoActualizado, { ...productoConId, stock: 50 })) {
        throw new Error(`Esperaba que el producto ${JSON.stringify(productoActualizado, null, "\t")} sea igual que el producto ${JSON.stringify(productoConId, null, "\t")} pero con stock = 50`)
    }
    await manager.deleteProduct(productoActualizado.id)
    products = await manager.getProducts();
    if (products.some((product) => { return productosSonIguales(product, productoActualizado) })) {
        throw new Error(`esperaba que el producto  ${JSON.stringify(productoActualizado, null, "\t")}no este en la lista de productos, pero lo esta. La lista de contiene ${JSON.stringify(products, null, "\t")}`)
    }
    try {
        await manager.deleteProduct(productoActualizado.id)
        throw new Error(`esperaba un error`)
    }
    catch (error) {
        if (error.message === `esperaba un error`) {
            throw new Error(`Esperaba que intentar eliminar el producto con el id ${productoActualizado.id} arroje un error porque no existe ningun producto con ese id, pero no lo hizo`)
        }

    }

    console.log("todos los test pasaron")

    }

finally{
    eliminarArchivoJson()
}



}



prueba()
;
function eliminarArchivoJson() {
    if (fs.existsSync("productos-prueba.json")) { fs.unlinkSync("productos-prueba.json"); }
}

