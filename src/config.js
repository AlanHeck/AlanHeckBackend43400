import dotenv from "dotenv";
dotenv.config();

const config = {
    dbUrl: process.env.DB_URL,
    sessionSecret: process.env.SESSION_SECRET,
};

export default config;
