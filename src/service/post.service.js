import { findPosts } from "../repository/post.repository.js";

const getAllPosts = async () => {
    const posts = await findPosts();

    return posts;
};

export { getAllPosts };
