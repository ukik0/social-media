import { useGetUser, useGetUserPosts } from '@/utils/api';

export const useProfilePage = (id: string, active: PostsSorting) => {
    const { data: posts, isLoading: isPostsLoading } = useGetUserPosts({ userId: id, active });
    const { data: user, isLoading: isUserLoading } = useGetUser(id);

    const isLoading = isPostsLoading || isUserLoading;

    return {
        posts,
        user,
        isLoading
    };
};
