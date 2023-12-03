import { usersService } from "../services/index.js";
import { isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import CustomError from "../errors/CustomErrors.js";
import { AuthenticationError } from "../errors/DatabaseAccessError.js";

const {
    jwt: { cookieName, secret },
} = config;

export const register = async (req, res, next) => {
    try {
        return res.send({ status: "success", message: "User registered" });
    } catch (error) {
        next(error);
    }
};

export const failRegister = async (req, res, next) => {
    try {
        throw new CustomError({
            name: "FailedRegisterError",
            message: "Authentication error",
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await usersService.getUserById({ email });

        if (!user) {
            throw new AuthenticationError("Invalid credentials");
        }

        if (!isValidPassword(user, password)) {
            throw new AuthenticationError("Invalid credentials");
        }

        const jwtUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            cart: user.cart,
        };

        const token = jwt.sign(jwtUser, secret, { expiresIn: "24h" });

        return res.cookie(cookieName, token, { httpOnly: true }).send({
            status: "success",
            message: "Login successful",
        });
    } catch (error) {
        next(error);
    }
};

export const gitHubLogin = async (req, res, next) => {
    try {
        const jwtUser = {
            name: req.user.first_name,
            email: req.user.email,
            cart: req.user.cart,
        };

        const token = jwt.sign(jwtUser, secret, { expiresIn: "24h" });

        return res.cookie(cookieName, token, { httpOnly: true }).redirect("/");
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        return res
            .clearCookie(cookieName)
            .send({ status: "success", message: "Logout successful" });
    } catch (error) {
        next(error);
    }
};

export const changeUserRole = async (req, res, next) => {
    try {
        const userId = req.params.uid;
        const { role } = req.body;

        if (!["user", "premium"].includes(role)) {
            return res.status(400).send({
                status: "Error",
                error: "Invalid role. Allowed roles are 'user' and 'premium'.",
            });
        }

        const updatedUser = await usersService.changeUserRole(userId, role);

        return res.send({
            status: "OK",
            message: "User role successfully updated",
            payload: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};
