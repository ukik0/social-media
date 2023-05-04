import { useEffect } from 'react';
import { GoSearch } from 'react-icons/go';

import { useRouter } from 'next/router';

import { Result, useSearch } from '@/components';

import cl from './Search.module.scss';

export const Search = () => {
    const { events } = useRouter();
    const { posts, searchValue, setSearchValue, isSuccess } = useSearch();

    useEffect(() => {
        events.on('routeChangeComplete', () => setSearchValue(''));
    }, [events]);

    return (
        <div className={cl.wrapper}>
            <div className={cl[`input__wrapper`]}>
                <input
                    type='text'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className={cl.input}
                    placeholder={'Найти интересующий пост'}
                />
                <GoSearch className={cl.icon} />
            </div>

            <Result posts={posts} isSuccess={isSuccess} />
        </div>
    );
};
