import { Typography } from '@/app/components';

import { Dispatch, SetStateAction, forwardRef, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { NAV_LIST } from '@/utils';

import cn from 'classnames';

import cl from './Navigation.module.scss';

interface NavigationProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}

export const Navigation = forwardRef<HTMLUListElement, NavigationProps>(({ active, setActive }, ref) => {
    const { asPath, events } = useRouter();

    useEffect(() => {
        events.on('routeChangeComplete', () => setActive(false));
    }, []);

    return (
        <ul
            ref={ref}
            className={cn(cl.list, {
                [cl.active]: active
            })}
        >
            {NAV_LIST.map(({ title, href, icon: Icon }) => {
                return (
                    <li key={href}>
                        <div
                            className={cn(cl.wrapper, {
                                [cl.active]: asPath === href
                            })}
                        >
                            <Icon className={cl.icon} />
                            <Link href={href} className={cl.title}>
                                <Typography tag={'span'} variant={'description'}>
                                    {title}
                                </Typography>
                            </Link>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
});
