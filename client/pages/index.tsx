import { NextPage } from 'next';

import { Layout } from '@/components';

import { HomePage } from '@/pages';

const Home: NextPage = () => {
    return (
        <Layout title={'Главная страница приложения.'}>
            <HomePage />
        </Layout>
    );
};

export default Home;
