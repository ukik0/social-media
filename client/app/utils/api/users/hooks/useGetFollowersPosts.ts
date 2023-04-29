import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/utils/api';
import { useAuth } from '@/store';

export const useGetFollowersPosts = () => {
    const {isAuth} = useAuth()

    return useQuery({
        queryFn: () => usersApi.getFollowersPosts(),
        queryKey: ['followersPosts'],
        select: (user) => user.data,
        enabled: isAuth,
    });
};