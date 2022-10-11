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
    },
    edit: (id, name) => {
        const edit = async (id, name) => {
            try {
                const response = await categoryApi.edit({ id, name });
                return response;
            } catch (error) {
                console.log('Edit category failed', error);
                return null;
            }
        }
        return edit(id, name);
    }
}

export default CategoryService;