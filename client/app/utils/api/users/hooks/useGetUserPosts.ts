import { useQuery } from '@tanstack/react-query';

import { usersApi } from '@/utils/api';

interface QueryProps {
    userId: string;
    active: PostsSorting;
}

export const useGetUserPosts = ({ userId, active }: QueryProps) => {
    return useQuery({
        queryFn: () => usersApi.getUserPosts({ userId, sortBy: active.type, sortValue: active.value }),
        queryKey: ['userPosts', userId, active],
        select: (posts) => posts.data,
        enabled: !!userId,
        keepPreviousData: true
    });
};
