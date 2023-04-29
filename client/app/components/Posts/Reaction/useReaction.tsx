import { useLikePostMutation, useUnlikePostMutation } from '@/utils/api';

export const useReaction = (post: Post) => {
    const { mutate: likePost, isLoading: likePostIsLoading } = useLikePostMutation(post._id);
    const { mutate: unlikePost, isLoading: unlikePostIsLoading } = useUnlikePostMutation(post._id);

    const mutationIsLoading = likePostIsLoading || unlikePostIsLoading;

    const isLoading = mutationIsLoading;

    return {
        mutations: { likePost, unlikePost },
        isLoading
    };
};
