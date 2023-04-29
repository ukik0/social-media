import { useAuthStore } from '@/app/store';
import { AxiosError } from 'axios';

import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { favouritesApi } from '@/app/utils/api';

export const useGetFavouritesPosts = () => {
    const { isAuth } = useAuthStore((state) => state);

    return useQuery({
        queryFn: () => favouritesApi.getFavouritesPosts(),
        queryKey: ['favouritesPosts'],
        select: (posts) => posts.data,
        enabled: isAuth,
        onError: (error: AxiosError<Error>) => {
            toast.error(`${error?.response?.data.message}`);
        }
    });
};
