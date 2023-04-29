import { Posts } from '@/components';

import { Sidebar } from '@/app/pages/Home/';

import cl from './HomePage.module.scss';

export const HomePage = () => {
    return (
        <main className={cl.home}>
            <div className='container'>
                <div className={cl[`home__content`]}>
                    <Posts />
                    <Sidebar />
                </div>
            </div>
        </main>
    );
};
