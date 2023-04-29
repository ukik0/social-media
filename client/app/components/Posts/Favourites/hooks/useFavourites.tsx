import { useAuthStore } from '@/store';

import {
    useAddPostToFavouritesMutation,
    useGetFavouritesPosts,
    useRemovePostFromFavouritesMutation
} from '@/utils/api';

export const useFavourites = (postId: Post['_id']) => {
    const isAuth = useAuthStore((state) => state.isAuth);

    const { data: favouritesPosts, isLoading: dataIsLoading } = useGetFavouritesPosts();
    const { mutate: addPostToFavourite, isLoading: isAddFavouriteLoading } = useAddPostToFavouritesMutation(
        postId
    );
    const { mutate: removePostFromFavourite, isLoading: isRemoveFavouriteLoading } =
        useRemovePostFromFavouritesMutation(postId);

    const mutationIsLoading = isAddFavouriteLoading || isRemoveFavouriteLoading;

    const isLoading = mutationIsLoading || dataIsLoading;

    return {
        favouritesPosts,
        mutations: { addPostToFavourite, removePostFromFavourite },
        isLoading,
        isAuth
    };
};
