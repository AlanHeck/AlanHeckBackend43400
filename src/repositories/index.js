import ProductsRepository from "./products.repository.js";
import CartsRepository from "./carts.repository.js";
import UsersRepository from "./users.repository.js";

export const productsRepository = new ProductsRepository();
export const cartsRepository = new CartsRepository();
export const usersRepository = new UsersRepository();
