import prisma from "../../../db/prisma.js";

const createCategorysOnPost = async (count) => {
    const categorysOnPost = [];

    // Mendapatkan seluruh postingan dan kategori yang ada
    const allPosts = await prisma.post.findMany();
    const allCategories = await prisma.category.findMany();

    for (let i = 0; i < count; i++) {
        // Memilih postingan dan kategori secara acak dari seluruh postingan dan kategori yang ada
        const randomPost =
            allPosts[Math.floor(Math.random() * allPosts.length)];
        const randomCategory =
            allCategories[Math.floor(Math.random() * allCategories.length)];

        const newCategorysOnPost = await prisma.categorysOnPost.create({
            data: {
                post: {
                    connect: { id: randomPost.id },
                },
                category: {
                    connect: { id: randomCategory.id },
                },
            },
        });

        categorysOnPost.push(newCategorysOnPost);
    }

    return categorysOnPost;
};

export { createCategorysOnPost };
