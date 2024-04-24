import { faker } from "@faker-js/faker";
import prisma from "../../../db/prisma.js";

const createUserWithProfile = async (count) => {
    const usersWithProfiles = [];

    for (let i = 0; i < count; i++) {
        const role = Math.random() < 0.5 ? "USER" : "ADMIN";

        try {
            // Membuat pengguna baru
            const newUser = await prisma.user.create({
                data: {
                    email: faker.internet.email(),
                    name: faker.person.fullName(),
                    role,
                },
            });

            // Membuat profil baru untuk pengguna yang baru dibuat
            const newProfile = await prisma.profile.create({
                data: {
                    bio: faker.lorem.sentence(),
                    user: {
                        connect: {
                            id: newUser.id,
                        },
                    },
                },
            });

            // Menyimpan pengguna dan profil dalam array
            usersWithProfiles.push({ newUser, newProfile });

            console.log(`========== START USER & PROFILE ${i + 1} ==========`);
            console.log(`User: {
    email: ${newUser.email}
    name: ${newUser.name}
    role: ${newUser.role}
}`);
            console.log(`Profile: {
    bio: ${newProfile.bio}
}`);
            console.log(`========== END USER & PROFILE ${i + 1} ==========`);
            console.log(`\n`);
        } catch (error) {
            console.error("Error creating user with profile:", error);
            // Handle error jika ada
            // Misalnya, Anda bisa melanjutkan ke iterasi berikutnya
            continue;
        }
    }

    return usersWithProfiles;
};

// const createUserWithProfile = async (count) => {
//     const users = await prisma.$transaction(
//         Array(count)
//             .fill(null)
//             .map((_, i) => {
//                 const role = Math.random() < 0.5 ? "USER" : "ADMIN";

//                 return prisma.user.create({
//                     data: {
//                         email: faker.internet.email(),
//                         name: faker.person.fullName(),
//                         role,
//                     },
//                 });
//             })
//     );

//     const profiles = Array(10)
//         .fill(null)
//         .map(() => {
//             return prisma.profile.create({
//                 data: {
//                     bio: faker.lorem.sentence(),
//                     user: {
//                         connect: {
//                             user_id:
//                                 users[Math.floor(Math.random() * users.length)]
//                                     .user_id,
//                         },
//                     },
//                 },
//             });
//         });

//     return prisma.$transaction(profiles);
// };

export { createUserWithProfile };
