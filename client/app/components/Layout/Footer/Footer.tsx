import Link from 'next/link';

import { Typography } from '@/components';

import { ROUTES } from '@/utils';

import cl from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={cl.footer}>
            <div className='container'>
                <div className={cl[`footer__content`]}>
                    <Link href={ROUTES.ROOT} className={cl.logo}>
                        Social-App
                    </Link>

                    <ul className={cl.list}>
                        <li className={cl.item}>
                            <Link href={ROUTES.FRIENDS_FIND}>Найти друзей</Link>
                        </li>

                        <li className={cl.item}>
                            <Link href={ROUTES.FAVOURITES}>Избранное</Link>
                        </li>
                    </ul>

                    <Typography variant={'sub-title-1'}>© 2023 Social-App</Typography>
                </div>
            </div>
        </footer>
    );
};
