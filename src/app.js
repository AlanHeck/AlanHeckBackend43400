import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import database from "./mongo.js";
import socket from "./socket.js";
import passport from "passport";
import initializePassport from "./config/passport.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
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
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(8080, (req, res) => {
  console.log("Listening on port 8080");
});

socket.connect(httpServer);