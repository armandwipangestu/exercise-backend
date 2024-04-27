import prisma from "../../db/prisma.js";

const findCategories = async () => {
    const categories = await prisma.category.findMany({
        include: {
            posts: true,
        },
    });

    return categories;
};

export { findCategories };
