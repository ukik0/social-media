import { allPages } from 'contentlayer/generated';

import { Mdx } from '@/components';

export const PrivacyPage = () => {
    const [page] = allPages.map((page) => page);

    return (
        <main>
            <div className='container'>
                <Mdx code={page.body.code} />
            </div>
        </main>
    );
};
