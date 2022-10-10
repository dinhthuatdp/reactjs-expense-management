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
    },
    add: (name) => {
        const add = async (name) => {
            try {
                const response = await categoryApi.add(name);
                return response;
            } catch (error) {
                console.log('Add category failed', error);
                return null;
            }
        }

        return add(name);
    }
}

export default CategoryService;