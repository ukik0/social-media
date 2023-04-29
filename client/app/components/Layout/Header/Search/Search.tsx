import { GoSearch } from 'react-icons/go';

import { Result, useSearch } from '@/components';

import cl from './Search.module.scss';

export const Search = () => {
    const { posts, searchValue, setSearchValue, isSuccess } = useSearch();

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
