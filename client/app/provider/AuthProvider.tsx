import { NextPage } from 'next';

import { FC, PropsWithChildren } from 'react';

import dynamic from 'next/dynamic';

const DynamicCheckRole = dynamic(() => import('./Role'), {
    ssr: false
});

type AuthFiled = { isAuth: boolean };
export type AuthFieldsComponents = { Component: AuthFiled };

export type NextPageAuth<T = {}> = NextPage<T> & AuthFiled;

export const AuthProvider: FC<PropsWithChildren<AuthFieldsComponents>> = ({
    children,
    Component: { isAuth }
}) => {
    return !isAuth ? <>{children}</> : <DynamicCheckRole Component={{ isAuth }}>{children}</DynamicCheckRole>;
};
