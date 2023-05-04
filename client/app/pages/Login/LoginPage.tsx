import { useAuthStore } from '@/app/store';
import { zodResolver } from '@hookform/resolvers/zod';
import loginBg from 'public/login-bg.png';

import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, Field, Typography } from '@/components';

import { ROUTES } from '@/utils/constants';
import { LoginValidationSchema, LoginValidationSchemaType } from '@/utils/constants/validation';

import cl from './LoginPage.module.scss';

export const LoginPage = () => {
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<LoginValidationSchemaType>({ resolver: zodResolver(LoginValidationSchema), mode: 'all' });

    const onSubmit: SubmitHandler<LoginValidationSchemaType> = async (data) => {
        await login(data.name, data.password);
        reset();
        router.push(ROUTES.ROOT);
    };

    return (
        <main className={cl.login}>
            <div className='container'>
                <div className={cl[`login__content`]}>
                    <div className={cl.image}>
                        <Image src={loginBg} alt={'bg'} width={650} height={300} priority={true} />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
                        <Typography tag={'h1'} variant={'title-2'} className={cl.title}>
                            Авторизация:
                        </Typography>

                        <div className={cl.wrapper}>
                            <Field
                                label={'Ваше имя:'}
                                type={'text'}
                                error={errors.name}
                                {...register('name')}
                                placeholder={'Введите имя'}
                            />

                            <Field
                                label={'Ваш пароль:'}
                                type={'password'}
                                error={errors.password}
                                {...register('password')}
                                placeholder={'Введите пароль'}
                            />
                        </div>

                        <Button disabled={!isValid} variant={'outlined'} type={'submit'} className={cl.btn}>
                            Авторизоваться
                        </Button>

                        <div className={cl.account}>
                            <Typography tag={'span'} variant={'sub-title-1'}>
                                Нет аккаунта?
                            </Typography>

                            <Link href={ROUTES.REGISTER}>Зарегистрироваться</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};
