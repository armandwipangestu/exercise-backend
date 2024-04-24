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

export { findUsers, findUserById };
