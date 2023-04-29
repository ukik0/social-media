import { Typography } from '@/app/components';

import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

import cl from './Field.module.scss';

interface FieldProps extends ReactTagProps<'input'> {
    label: string;
    error?: FieldError;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(({ label, error, ...rest }, ref) => {
    return (
        <>
            <Typography tag={'label'} variant={'sub-title-1'} className={cl.label}>
                {label}
            </Typography>

            <input ref={ref} className={cl.input} {...rest} />

            {error && (
                <Typography tag={'span'} variant={'error'}>
                    {error.message!}
                </Typography>
            )}
        </>
    );
});
