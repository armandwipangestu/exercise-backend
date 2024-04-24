import { faker } from "@faker-js/faker";
import prisma from "../../../db/prisma.js";

const createPostsOfUser = async (count) => {
    const postsOfUser = [];

    const allUsers = await prisma.user.findMany();

    for (let i = 0; i < count; i++) {
        const randomUser =
            allUsers[Math.floor(Math.random() * allUsers.length)];
        const published = Math.random() < 0.5 ? true : false;

        const newPost = await prisma.post.create({
            data: {
                title: faker.lorem.words(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
                published,
                author: {
                    connect: {
                        id: randomUser.id,
                    },
                },
            },
        });

        postsOfUser.push(newPost);
    }

    return postsOfUser;
};

export { createPostsOfUser };
