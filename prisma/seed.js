import prisma from "../db/prisma.js";
import { createCategories } from "./seed/helper/Categorys.js";
import { createCategorysOnPost } from "./seed/helper/CategorysOnPost.js";
import { clean } from "./seed/helper/clean.js";
import { createPostsOfUser } from "./seed/helper/PostsOfUser.js";
import { createUserWithProfile } from "./seed/helper/UserWithProfile.js";

async function main() {
    console.log(`Cleaning database...`);
    await clean();
    console.log(`Database cleaned.`);

    console.log(`Start seeding ...`);

    console.log(`Seeding createUserWithProfile`);
    await createUserWithProfile(10)
        .then((usersWithProfiles) => {
            console.log(`Seeder createUserWithProfile success!`);
        })
        .catch((error) => {
            console.log(`Seeder createdUserWithProfile error: ${error}`);
        });

    console.log(`Seeding createPostsOfUser`);
    await createPostsOfUser(10)
        .then((postsOfUsers) => {
            console.log(`Seeder createPostsOfUser success!`);
        })
        .catch((error) => {
            console.log(`Seeder createPostsOfUser error: ${error}`);
        });

    console.log(`Seeding createCategories`);
    await createCategories(10)
        .then((categories) => {
            console.log(`Seeder createCategories success!`);
        })
        .catch((error) => {
            console.log(`Seeder createCategories error: ${error}`);
        });

    console.log(`Seeding categorysOnPost`);
    await createCategorysOnPost(10)
        .then((categorysOnPost) => {
            console.log(`Seeder createCategorysOnPost success!`);
        })
        .catch((error) => {
            console.log(`Seeder createCategorysOnPost error: ${error}`);
        });

    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
