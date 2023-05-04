import { Dispatch, HTMLInputTypeAttribute, SetStateAction, forwardRef } from 'react';

import cn from 'classnames';

import cl from './Input.module.scss';

interface InputProps extends ReactTagProps<'input'> {
    className?: string;
    type?: HTMLInputTypeAttribute;
    onChange?: (...args: any) => void;
    onClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = 'text', onChange, onClick, ...rest }, ref) => {
        return (
            <input
                type={type}
                className={cn(cl.input, className)}
                onChange={onChange}
                onClick={onClick}
                ref={ref}
                {...rest}
            />
        );
    }
);
