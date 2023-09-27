import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import database from "./db.js";
import socket from "./socket.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import productsRouter from "./routes/product.router.js";
import cartsRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import __dirname from "./utils.js";

// Initialization
const app = express();

// Settings
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(`${__dirname}/public`));
app.use(morgan("dev"));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

// Database connection
database.connect();

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(8080, (req, res) => {
  console.log("Listening on port 8080");
});

socket.connect(httpServer);