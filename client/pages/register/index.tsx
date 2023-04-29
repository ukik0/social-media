import { NextPageAuth } from '@/app/@types';

import { Layout } from '@/components';

import { RegisterPage } from '@/pages';

const Register: NextPageAuth = () => {
    return (
        <Layout title={'Страница регистрации'}>
            <RegisterPage />
        </Layout>
    );
};

Register.isAuth = false;

export default Register;
