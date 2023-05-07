import { useAuthStore } from '@/app/store';
import registerBg from '@/public/register-bg.png';
import { zodResolver } from '@hookform/resolvers/zod';

import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';

import { Button, Field, Typography } from '@/components';

import { ROUTES } from '@/utils/constants';
import { RegisterValidationSchema, RegisterValidationSchemaType } from '@/utils/validation';

import cl from './RegisterPage.module.scss';

export const RegisterPage = () => {
    const { register: registration } = useAuthStore((state) => state);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<RegisterValidationSchemaType>({
        resolver: zodResolver(RegisterValidationSchema),
        mode: 'all'
    });
    const onSubmit: SubmitHandler<RegisterValidationSchemaType> = (data) => {
        registration(data.name, data.email, data.password);
        reset();
    };

    return (
        <main className={cl.register}>
            <div className='container'>
                <div className={cl[`register__content`]}>
                    <div className={cl.image}>
                        <Image src={registerBg} alt={'bg'} width={650} height={800} priority={true} />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
                        <Typography tag={'h1'} variant={'title-2'} className={cl.title}>
                            Регистрация:
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
                                label={'Ваша почта:'}
                                type={'email'}
                                error={errors.email}
                                {...register('email')}
                                placeholder={'Введите почту'}
                            />

                            <Field
                                label={'Ваш пароль:'}
                                type={'password'}
                                error={errors.password}
                                {...register('password')}
                                placeholder={'Введите пароль'}
                            />

                            <Field
                                label={'Подтвердите пароль:'}
                                type={'password'}
                                error={errors.confirmPassword}
                                {...register('confirmPassword')}
                                placeholder={'Введите пароль'}
                            />
                        </div>

                        <Button disabled={!isValid} className={cl.btn} type={'submit'}>
                            Регистрация
                        </Button>

                        <div className={cl.account}>
                            <Typography tag={'span'} variant={'sub-title-1'}>
                                Есть аккаунта?
                            </Typography>{' '}
                            <Link href={ROUTES.LOGIN}>Авторизоваться</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};
