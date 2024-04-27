import prisma from "../../db/prisma.js";

// Explicit Many-to-Many
// const findPosts = async () => {
//     const posts = await prisma.post.findMany({
//         include: {
//             CategorysOnPost: {
//                 select: {
//                     category: {
//                         select: {
//                             name: true,
//                         },
//                     },
//                 },
//             },
//         },
//     });

//     return posts;
// };

const findPosts = async () => {
    const posts = await prisma.post.findMany({
        include: {
            categorys: true,
        },
    });

    return posts;
};

export { findPosts };
