import Cart from "./cart.dao.js";
import Product from "./product.dao.js";
import User from "./user.dao.js";
import Message from "./message.dao.js";

export const cartDao = new Cart();
export const productDao = new Product();
export const userDao = new User();
export const messageDao = new Message();