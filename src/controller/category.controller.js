import { getAllCategories } from "../service/category.service.js";

export const getAllCategoriesHandler = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).send({
            data: categories,
            message: "Get Categories",
            success: true,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};
