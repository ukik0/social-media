import { NextPageAuth } from '@/app/@types';

import { Layout } from '@/components';

import { LoginPage } from '@/pages';

const Login: NextPageAuth = () => {
    return (
        <Layout title={'Страница авторизации'}>
            <LoginPage />
        </Layout>
    );
};

Login.isAuth = false;
export default Login;
