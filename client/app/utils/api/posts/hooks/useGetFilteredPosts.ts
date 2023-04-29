import { PaginationPostContext } from '@/app/context';
import { AxiosError } from 'axios';

import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { DateObject } from 'react-multi-date-picker';

import { postsApi } from '@/app/utils/api';

interface QueryProps {
    active: PostsSorting;
    date: DateObject[];
}
export const useGetFilteredPosts = ({ active, date }: QueryProps) => {
    const { currentPage } = useContext(PaginationPostContext);

    return useQuery({
        queryFn: () =>
            postsApi.getFilteredPosts({
                page: currentPage,
                sortBy: active.type,
                sortValue: active.value,
                start: date[0] || '2021-01-01',
                end: date[1] || '9999-01-01'
            }),
        queryKey: ['filteredPosts', active.title, currentPage, date],
        select: (posts) => posts.data,
        onError: (error: AxiosError<Error>) => {
            toast.error(`Произошла непредвиденная ошибка :(`);
        }
    });
};
