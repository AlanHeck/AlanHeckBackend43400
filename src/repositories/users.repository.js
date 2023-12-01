import { DatabaseAccessError } from "../errors/DatabaseAccessError.js";
import { userDao } from "../dao/mongo/index.js";

export default class UsersRepository {
    getUserById = async (id) => {
        try {
            const user = await userDao.getUserById(id);
            return user;
        } catch (error) {
            throw new DatabaseAccessError("users", "getUserById", `Unable to fetch user with ID ${id}`, error);
        }
    };

    createUser = async (user) => {
        try {
            const newUser = await userDao.createUser(user);
            return newUser;
        } catch (error) {
            throw new DatabaseAccessError("users", "createUser", "Unable to create user", error);
        }
    };
}