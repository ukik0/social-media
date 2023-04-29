import { AnchorHTMLAttributes, FC } from 'react';

import Link from 'next/link';

import cn from 'classnames';

import cl from './LinkButton.module.scss';

type VariantTypes = 'contained' | 'outlined';
interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: string;
    to: string;
    variant?: VariantTypes;
}

export const LinkButton: FC<LinkButtonProps> = ({ children, to, variant = 'container', ...rest }) => {
    return (
        <Link
            href={to}
            className={cn(cl.link, {
                [cl.outlined]: variant === 'outlined',
                [cl.contained]: variant === 'contained'
            })}
            {...rest}
        >
            {children}
        </Link>
    );
};
