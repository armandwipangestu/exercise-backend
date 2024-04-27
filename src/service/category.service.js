import { findCategories } from "../repository/category.repository.js";

const getAllCategories = async () => {
    const categories = await findCategories();

    return categories;
};

export { getAllCategories };
