import { usersService } from "../services/index.js";
import { isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const {
    jwt: { cookieName, secret },
} = config;

export const register = async (req, res) => {
    try {
        return res.send({ status: "sucess", message: "user registered" });
    } catch (error) {
        console.log(error);
    }
};

export const failRegister = async (req, res) => {
    try {
        console.log("Failed Register");
        return res.send({ status: "error", error: "authentication error" });
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await usersService.getUserById({ email });

        if (!user)
            return res
                .status(401)
                .send({ status: "error", error: "Invalid Credentials" });

        if (!isValidPassword(user, password))
            return res
                .status(401)
                .send({ status: "error", error: "Invalid Credentials" });

        const jwtUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            cart: user.cart,
        };

        const token = jwt.sign(jwtUser, secret, { expiresIn: "24h" });

        return res.cookie(cookieName, token, { httpOnly: true }).send({
            status: "sucess",
            message: "Login sucessful",
        });
    } catch (error) {
        console.log(error);
    }
};

export const gitHubLogin = async (req, res) => {
    try {
        const jwtUser = {
            name: req.user.first_name,
            email: req.user.email,
            cart: req.user.cart,
        };

        const token = jwt.sign(jwtUser, secret, { expiresIn: "24h" });

        return res.cookie(cookieName, token, { httpOnly: true }).redirect("/");
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res) => {
    try {
        return res
            .clearCookie(cookieName)
            .send({ status: "sucess", message: "log out sucessful" });
    } catch (error) {
        console.log(error);
    }
};
