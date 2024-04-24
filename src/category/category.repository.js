import prisma from "../../db/prisma.js";

const findCategories = async () => {
    const categories = await prisma.category.findMany({});

    return categories;
};

export { findCategories };
