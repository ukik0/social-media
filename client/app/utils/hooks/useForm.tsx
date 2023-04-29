import { SyntheticEvent, useState } from 'react';

interface UseForm<Values> {
    initialValues: Values;
    onSubmit: (values: Values) => void;
    validate?: (values: Values) => { [Key in keyof Values]: string } | null;
}
export const useForm = <Values,>({ initialValues, validate, onSubmit }: UseForm<Values>) => {
    const [values, setValues] = useState<Values>(initialValues);
    const [errors, setErrors] = useState<Record<keyof Values, string | null>>();

    const setFieldValues = <Field extends keyof Values>(field: Field, value: Values[Field]) => {
        setValues({ ...values, [field]: value });
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!validate) return onSubmit(values);

        const errors = validate(values);

        if (!!errors) return setErrors(errors);
    };

    return { values, setFieldValues, handleSubmit };
};
