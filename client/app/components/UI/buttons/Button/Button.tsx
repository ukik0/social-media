import { FC, MouseEvent } from 'react';
import { IconType } from 'react-icons';

import cn from 'classnames';

import cl from './Button.module.scss';

interface ButtonProps extends ReactTagProps<'button'> {
    variant?: 'outlined' | 'contained' | 'text';
    children?: string | null;
    onClick?: (...args: any) => void;
    className?: string;
    Icon?: IconType;
    fill?: boolean;
}

export const Button: FC<ButtonProps> = ({
    children,
    onClick,
    className,
    Icon,
    variant = 'outlined',
    fill,
    ...rest
}) => {
    return (
        <button
            className={cn(cl.btn, className, {
                [cl.outlined]: variant === 'outlined',
                [cl.contained]: variant === 'contained',
                [cl.text]: variant === 'text',
                [cl.fill]: fill
            })}
            onClick={onClick}
            {...rest}
        >
            {Icon && <Icon className={cl.icon} />}
            {children && <span className={cl.title}>{children}</span>}
        </button>
    );
};
