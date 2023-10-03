import userModel from "../models/users.js";

export default class User {
    constructor() { }

    getUserById = async (filter) => {
        try {
            const foundUser = await userModel.findOne(filter);
            return foundUser;
        } catch (error) {
            console.log(error);
        }
    };

    createUser = async (user) => {
        try {
            const result = await userModel.create(user);
            return result;
        } catch (error) {
            console.log(error);
        }
    };
}