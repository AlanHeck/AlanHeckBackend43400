import mongoose from "mongoose";
import config from "./config.js";

const { dbUser, dbName, dbPassword } = config;

const database = {
    connect: async () => {
        try {
            await mongoose.connect(
                `mongodb+srv://${dbUser}:${dbPassword}@cluster0.1k06imr.mongodb.net/${dbName}?retryWrites=true&w=majority`
            );
        } catch (error) {
            console.log(error);
        }
    },
};

export default database;