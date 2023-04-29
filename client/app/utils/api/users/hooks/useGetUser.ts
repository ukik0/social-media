import { useQuery } from '@tanstack/react-query';

import { usersApi } from '@/utils/api';

export const useGetUser = (userId: string) => {
    return useQuery({
        queryFn: () => usersApi.getUser(userId),
        queryKey: ['user', userId],
        select: (user) => user.data,
        enabled: !!userId,
        keepPreviousData: true
    });
};
