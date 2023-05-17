import { FC, ReactNode, useEffect } from 'react';

import { useAuth } from '@/store';

interface ApiLayoutProps {
    children: ReactNode;
}

export const SessionChecker: FC<ApiLayoutProps> = ({ children }) => {
    const { checkAuth } = useAuth();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage.getItem('token')) {
            checkAuth();
        }
    }, []);

    return <>{children}</>;
};
