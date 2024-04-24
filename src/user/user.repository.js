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

export { findUsers, findUserById, findUserByEmail, insertUser, editUser };
