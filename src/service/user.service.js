import {
    deleteUser,
    editUser,
    findUserByEmail,
    findUserById,
    findUserByRefreshToken,
    findUsers,
    findUsersByRole,
    insertUser,
} from "../repository/user.repository.js";

const getAllUsers = async () => {
    const posts = await findUsers();

    return posts;
};

const getAllUsersByRole = async (role) => {
    const users = await findUsersByRole(role);

    return users;
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

const getUserByRefreshToken = async (refreshToken) => {
    const user = await findUserByRefreshToken(refreshToken);

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

const editUserById = async (uid, userData) => {
    const userToEdit = await getUserById(uid);

    // Check if email want to edit is same with the user it self
    if (userData.email && userData.email !== userToEdit.email) {
        // Check if email want to edit is already use by another user
        const existingUser = await findUserByEmail(userData.email);
        if (existingUser && existingUser.uid !== uid) {
            throw Error("Email has already been taken");
        }
    }

    const user = await editUser(uid, userData);

    return user;
};

const deleteUserById = async (uid) => {
    await getUserById(uid);
    await deleteUser(uid);
};

export {
    getAllUsers,
    getAllUsersByRole,
    getUserById,
    getUserByEmail,
    getUserByRefreshToken,
    createUser,
    editUserById,
    deleteUserById,
};
