import { create } from 'zustand'
import PocketBase from 'pocketbase';

const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL;
if (!pocketBaseUrl) {
    throw new Error('VITE_POCKETBASE_URL is not defined in the environment variables.');
}
export const pb = new PocketBase(pocketBaseUrl);
// React StrictMode runs effects twice in dev; stop the SDK cancelling the duplicate request
pb.autoCancellation(false);

export const useConfiguratorStore = create((set) => ({
    categories: [],
    currentCategory: null,
    assets: [],
    fetchCategories: async () => {
        try {
            // you can also fetch all categories at once via getFullList
            const categories = await pb.collection('CustomizationGroups').getFullList({
                sort: '+position',
            });
            const assets = await pb.collection('CustomizationAssets').getFullList({
                sort: '-created',
            });

            categories.forEach(category => {
                category.assets = assets.filter((asset) => asset.group === category.id);
            });

            set({ categories, currentCategory: categories[0], assets });
        }
        catch (error) {
            console.error('Error fetching categories:', error);
        }
    },
    setCurrentCategory: (category) => set({ currentCategory: category }),
}))