import { Dispatch, FC, SetStateAction } from 'react';

import { Typography } from '@/components';

import cn from 'classnames';

import cl from './Sorting.module.scss';

interface SortingProps<T> {
    sortingList: T[];
    active: T;
    setActive: Dispatch<SetStateAction<T>>;
}

export const Sorting: FC<SortingProps<PostsSorting>> = ({ sortingList, active, setActive }) => {
    return (
        <ul className={cl.sorting}>
            {sortingList.map((sort, idx) => (
                <li
                    key={sort.title}
                    className={cn(cl.item, {
                        [cl.active]: active.title === sort.title
                    })}
                    onClick={() => setActive(sort)}
                >
                    <Typography variant={'description'} tag={'span'}>
                        {sort.title}
                    </Typography>
                </li>
            ))}
        </ul>
    );
};
