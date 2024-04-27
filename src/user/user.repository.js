import prisma from "../../db/prisma.js";

const findUsers = async () => {
    const users = await prisma.user.findMany({
        include: {
            Profile: {
                select: {
                    bio: true,
                },
            },
        },
    });

    return users;
};

const findUsersByRole = async (role) => {
    const users = await prisma.user.findMany({
        where: {
            role,
        },
        include: {
            Profile: {
                select: {
                    bio: true,
                },
            },
        },
    });

    return users;
};

const findUserById = async (uid) => {
    const user = await prisma.user.findUnique({
        where: {
            uid,
        },
        include: {
            Profile: {
                select: {
                    bio: true,
                },
            },
        },
    });

    return user;
};

const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            Profile: {
                select: {
                    bio: true,
                },
            },
        },
    });

    return user;
};

const findUserByRefreshToken = async (refreshToken) => {
    const user = await prisma.user.findFirst({
        where: {
            refreshToken,
        },
    });

    return user;
};

const insertUser = async (userData) => {
    const newUser = await prisma.user.create({
        data: userData,
    });

    return newUser;
};

const editUser = async (uid, userData) => {
    const user = await prisma.user.update({
        where: {
            uid,
        },
        data: userData,
    });

    return user;
};

const updateRefreshTokenUser = async (uid, newRefreshToken) => {
    const user = await prisma.user.update({
        where: {
            uid,
        },
        data: {
            refreshToken: newRefreshToken,
        },
    });

    return user;
};

const deleteUser = async (uid) => {
    const user = await prisma.user.delete({
        where: {
            uid,
        },
    });

    return user;
};

export {
    findUsers,
    findUsersByRole,
    findUserById,
    findUserByEmail,
    findUserByRefreshToken,
    insertUser,
    editUser,
    updateRefreshTokenUser,
    deleteUser,
};
