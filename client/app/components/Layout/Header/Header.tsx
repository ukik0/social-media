import { Auth, BurgerMenu, Search } from '@/components';

import cl from './Header.module.scss';

export const Header = () => {
    return (
        <header className={cl.header}>
            <div className='container'>
                <div className={cl[`header__content`]}>
                    <BurgerMenu />
                    <Search />
                    <Auth />
                </div>
            </div>
        </header>
    );
};
