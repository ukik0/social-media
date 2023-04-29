import { z } from 'zod';

export const RegisterValidationSchema = z
    .object({
        name: z.string().min(1, { message: 'Поле обязательно' }),
        email: z.string().min(6, { message: 'Почта обязательна' }).email({
            message: 'Почта должна быть валидной'
        }),
        confirmPassword: z.string().min(1, { message: 'Поле обязательно' }),
        password: z.string().min(4, { message: 'Длина пароля должна быть ен менее 4 символов' })
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Пароли не совпадают'
    });

export type RegisterValidationSchemaType = z.infer<typeof RegisterValidationSchema>;
