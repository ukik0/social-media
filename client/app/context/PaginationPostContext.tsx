import { ReactNode, createContext, useState } from 'react';

const CURRENT_PAGE = 1;

interface PaginationPostContext {
    currentPage: number;
    prevPage: (page: number) => void;
    nextPage: (page: number) => void;
}

export const PaginationPostContext = createContext<PaginationPostContext>({
    currentPage: CURRENT_PAGE,
    nextPage: (page: number) => {},
    prevPage: (page: number) => {}
});

export const PaginationPostState = ({ children }: { children: ReactNode }) => {
    const [currentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);

    const nextPage = (page: number) => {
        setCurrentPage((prev) => prev + 1);
    };

    const prevPage = (page: number) => {
        setCurrentPage((prev) => prev - 1);
    };

    return (
        <PaginationPostContext.Provider value={{ currentPage, nextPage, prevPage }}>
            {children}
        </PaginationPostContext.Provider>
    );
};
