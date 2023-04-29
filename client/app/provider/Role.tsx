import { AuthFieldsComponents } from '@/app/provider/AuthProvider';

import { FC, PropsWithChildren } from 'react';

import { useRouter } from 'next/router';

import { useAuthStore } from '@/store';

const Role: FC<PropsWithChildren<AuthFieldsComponents>> = ({ Component: { isAuth }, children }) => {
    const { user } = useAuthStore();
    const { pathname, replace } = useRouter();

    if (user?._id) return <>{children}</>;

    if (isAuth) pathname !== '/' && replace('/');

    return null;
};

export default Role;
