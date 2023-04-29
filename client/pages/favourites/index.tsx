import { NextPageAuth } from '@/app/@types';

import { Layout } from '@/components';

import { FavouritesPage } from '@/pages';

const Favourites: NextPageAuth = () => {
    return (
        <Layout title={'Страница избранных постов'}>
            <FavouritesPage />
        </Layout>
    );
};

Favourites.isAuth = true;

export default Favourites;
