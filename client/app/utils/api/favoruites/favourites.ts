import { api } from '@/app/utils';

export const favouritesApi = {
    async addPostToFavourites({ postId }: { postId: string }) {
        return api.post<User>(`favourites/addFavouritePost/${postId}`);
    },
    async removePostFromFavourites({ postId }: { postId: string }) {
        return api.delete<User>(`favourites/removePostFromFavourites/${postId}`);
    },
    async getFavouritesPosts() {
        return api.get<Post[]>(`favourites`);
    }
};
