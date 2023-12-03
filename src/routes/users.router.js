import { Router } from "express";
import passport from "passport";
import {
    failRegister,
    gitHubLogin,
    login,
    logout,
    register,
    changeUserRole,
} from "../controllers/users.controller.js";

const router = Router();

router.post(
    "/register",
    passport.authenticate("register", {
        session: false,
        failureRedirect: "/api/users/failRegister",
    }),
    register
);

router.get("/failRegister", failRegister);

router.post("/login", login);

router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    async (req, res) => { }
);

router.get(
    "/githubcallback",
    passport.authenticate("github", {
        session: false,
        failureRedirect: "/login",
    }),
    gitHubLogin
);

router.post("/logout", logout);


router.patch(
    "/premium/:uid",
    passport.authenticate("jwt", { session: false }),
    changeUserRole
);
export default router;