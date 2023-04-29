import { FC, ReactNode } from 'react';

import Head from 'next/head';

import { Layouts } from '@/components';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export const Layout: FC<LayoutProps> = ({ children, title }) => {
    const seo = {
        title: 'Media Social-App',
        description: 'This app create Dmitriy'
    };

    return (
        <>
            <Head>
                <title>{title || seo.title}</title>
                <meta name='description' content={seo.description} />
                <meta name='viewport' content='width=device-width,initial-scale=1' />
            </Head>

            <Layouts.Header />
            {children}
            <Layouts.Footer />
        </>
    );
};
