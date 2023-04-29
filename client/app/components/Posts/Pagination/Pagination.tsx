import { PaginationPostContext } from '@/app/context';

import { FC, useContext } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { Button } from '@/components';

import cl from './Pagination.module.scss';

interface PaginationProps {
    pages?: number;
}

export const Pagination: FC<PaginationProps> = ({ pages }) => {
    const { currentPage, nextPage, prevPage } = useContext(PaginationPostContext);

    return (
        <div className={cl.pagination}>
            {currentPage >= 2 && (
                <Button Icon={MdNavigateBefore} className={cl.btn} onClick={() => prevPage(currentPage)} />
            )}

            {currentPage !== 0 && currentPage !== Math.ceil(pages!) && Math.ceil(pages!) > 0 && (
                <Button Icon={MdNavigateNext} className={cl.btn} onClick={() => nextPage(currentPage)} />
            )}
        </div>
    );
};
