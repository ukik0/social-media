import { Dispatch, FC, PropsWithChildren, SetStateAction, useEffect } from 'react';

import { useLockBody } from '@/utils/hooks/useLockBody';

import cn from 'classnames';

import cl from './Modal.module.scss';

interface ModalProps extends ReactTagProps<'div'> {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    className?: string;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
    active,
    setActive,
    className,
    children,
    ...rest
}) => {
    useLockBody({ active });

    return (
        <div
            className={cn(cl.modal, {
                [cl.active]: active
            })}
            onClick={() => setActive(false)}
            {...rest}
        >
            <div
                className={cn(cl.content, className, {
                    [cl.active]: active
                })}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
