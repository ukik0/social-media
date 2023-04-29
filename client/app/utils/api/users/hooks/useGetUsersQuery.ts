import { useQuery } from '@tanstack/react-query';

import { usersApi } from '@/utils/api';

export const useGetUsersQuery = () => {
    return useQuery({
        queryFn: () => usersApi.getUsers(),
        queryKey: ['users'],
        retry: 1,
        select: (users) => users.data
    });
};
