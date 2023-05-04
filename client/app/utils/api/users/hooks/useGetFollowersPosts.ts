import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/store';

import { usersApi } from '@/utils/api';

export const useGetFollowersPosts = () => {
    const { isAuth } = useAuth();

    return useQuery({
        queryFn: () => usersApi.getFollowersPosts(),
        queryKey: ['followersPosts'],
        select: (user) => user.data,
        enabled: isAuth
    });
};
