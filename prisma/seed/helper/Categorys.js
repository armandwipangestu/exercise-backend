import { faker } from "@faker-js/faker";
import prisma from "../../../db/prisma.js";

const createCategories = async (count) => {
    const categories = [];

    for (let i = 0; i < count; i++) {
        const newCategory = await prisma.category.create({
            data: {
                name: faker.lorem.word(),
            },
        });

        categories.push(newCategory);
    }

    return categories;
};

export { createCategories };
