import { RxHamburgerMenu } from 'react-icons/rx';

import Link from 'next/link';

import { Navigation } from '@/components';

import { ROUTES, useOutside } from '@/utils';

import cl from './BurgerMenu.module.scss';

export const BurgerMenu = () => {
    const { ref, isShow, setIsShow } = useOutside(false);

    return (
        <div className={cl.wrapper}>
            <div className={cl.burger}>
                <RxHamburgerMenu className={cl.icon} onClick={() => setIsShow((prev) => !prev)} />

                <Link href={ROUTES.ROOT} className={cl.logo}>
                    Social-App
                </Link>
            </div>

            <Navigation ref={ref} active={isShow} setActive={setIsShow} />
        </div>
    );
};
