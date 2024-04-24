import {
    findUserByEmail,
    findUserById,
    findUsers,
    insertUser,
} from "./user.repository.js";

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

const getUserByEmail = async (email) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw Error("User not found");
    }

    return user;
};

const createUser = async (newUserData) => {
    const findUser = await findUserByEmail(newUserData.email);

    if (findUser) {
        throw Error("Email has already taken");
    }

    const newUser = await insertUser(newUserData);

    return newUser;
};

export { getAllUsers, getUserById, getUserByEmail, createUser };
