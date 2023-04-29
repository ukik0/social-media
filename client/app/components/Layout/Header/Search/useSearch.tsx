import { useDebounce } from '@/app/utils';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { postsApi } from '@/utils/api';

export const useSearch = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const debouncedSearch = useDebounce(searchValue, 500);

    const { data: posts, isSuccess } = useQuery({
        queryFn: () => postsApi.getPostsByQuery({ query: debouncedSearch }),
        queryKey: ['postsByQuery', debouncedSearch],
        enabled: debouncedSearch.trim() !== '' && debouncedSearch.length >= 3,
        select: (posts) => posts.data,
        onError: (err) => {
            if (err instanceof Error) {
                console.log(err.message);
            }
        }
    });

    return { posts, isSuccess, searchValue, setSearchValue };
};
