import categoryApi from '../api/categoryApi';

const CategoryService = {
    getAll: () => {
        const getCategories = async () => {
            try {
                const categories = await categoryApi.getAll();
                return categories;
            } catch (error) {
                console.log('Get categories failed', error);
                return null;
            }
        }
        return getCategories();
    }
}

export default CategoryService;