import { Router } from "express";
import SessionManager from "../dao/dbManagers/sessions.js";
import CartManager from "../dao/dbManagers/carts.js";
import passport from "passport";

const router = Router();

router.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "/api/sessions/failRegister",
    }),
    async (req, res) => {
        return res.send({ status: "sucess", message: "user registered" });
    }
);

router.get("/failRegister", (req, res) => {
    console.log("Failed Register");
    return res.send({ status: "error", error: "authentication error" });
});

router.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/api/sessions/failLogin",
    }),
    async (req, res) => {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
        };

        return res.send({
            status: "sucess",
            message: "Login sucessful",
            payload: req.session.user,
        });
    }
);

router.get("/failLogin", (req, res) => {
    res.send({ status: "error", error: "failed login" });
});

router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    async (req, res) => { }
);

router.get(
    "/githubcallback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    async (req, res) => {
        req.session.user = req.user;
        console.log(req.user);
        res.redirect("/");
    }
);

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (!err)
            return res.send({ status: "sucess", message: "logout sucessful" });

        return res.send({ status: "error", message: err });
    });
});

export default router;
