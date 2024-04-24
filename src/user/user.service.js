import { findUsers } from "./user.repository.js";

const getAllUsers = async () => {
    const posts = await findUsers();

    return posts;
};

export { getAllUsers };
