import { findUserById, findUsers } from "./user.repository.js";

const getAllUsers = async () => {
    const posts = await findUsers();

    return posts;
};

const getUserById = async (uid) => {
    const user = await findUserById(uid);

    if (!user) {
        throw Error("User not found");
    }

    return user;
};

export { getAllUsers, getUserById };
