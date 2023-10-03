import { userDao } from "../dao/mongo/index.js";

export default class UsersRepository {
    getUserById = async (id) => {
        try {
            const user = await userDao.getUserById(id);
            return user;
        } catch (error) {
            console.log();
            return null;
        }
    };

    createUser = async (user) => {
        try {
            const user = await userDao.createUser(user);
            return user;
        } catch (error) {
            console.log();
            return null;
        }
    };
}
