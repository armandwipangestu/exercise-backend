import prisma from "../../db/prisma.js";

const findPosts = async () => {
    const posts = await prisma.post.findMany({
        include: {
            CategorysOnPost: {
                select: {
                    category: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    return posts;
};

export { findPosts };
