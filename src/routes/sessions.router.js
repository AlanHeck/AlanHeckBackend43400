import { Router } from "express";
import SessionManager from "../dao/dbManagers/sessions.js";
import CartManager from "../dao/dbManagers/carts.js";

const router = Router();
const sessionManager = new SessionManager();
const cartManager = new CartManager();

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, role } = req.body;

        const isUserRegistered = await sessionManager.getUser({ email });
        if (isUserRegistered) {
            return res
                .status(400)
                .send({ status: "error", error: "User already exists" });
        }

        const cart = await cartManager.addCart({});

        const user = {
            first_name,
            last_name,
            email,
            age,
            password,
            role: role ?? "user",
            cart: cart._id,
        };

        await sessionManager.register(user);

        return res.send({ status: "sucess", message: "user registered" });
    } catch (error) {
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await sessionManager.getUser({ email, password });

        if (!user) {
            return res
                .status(401)
                .send({ status: "error", error: "Incorrect credentials" });
        }

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role,
            cart: user.cart,
        };

        return res.send({
            status: "sucess",
            message: "Logged In",
            payload: req.session.user,
        });
    } catch (error) {
        console.log(error);
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (!err)
            return res.send({ status: "sucess", message: "logout sucessful" });

        return res.send({ status: "error", message: err });
    });
});

export default router;
