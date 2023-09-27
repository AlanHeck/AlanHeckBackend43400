import dotenv from "dotenv";
dotenv.config();

const config = {
    dbUrl: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
};

export default config;
