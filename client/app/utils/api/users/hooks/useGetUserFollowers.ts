import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/store';

import { usersApi } from '@/app/utils/api';

export const useGetUserFollowers = () => {
    const { isAuth } = useAuthStore();

    return useQuery({
        queryFn: () => usersApi.getUserFollowers(),
        queryKey: ['followers'],
        retry: 1,
        select: (users) => users.data,
        enabled: isAuth
    });
};
