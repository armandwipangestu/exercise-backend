import prisma from "../../../db/prisma.js";

const clean = async () => {
    await prisma.user.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.post.deleteMany();
    // await prisma.categorysOnPost.deleteMany();
    await prisma.category.deleteMany();
};

export { clean };
