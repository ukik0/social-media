import { z } from 'zod';

export const LoginValidationSchema = z.object({
    name: z.string().min(1, { message: 'Имя обязательное поле' }),
    password: z.string().min(4, { message: 'Длина пароля должна быть ен менее 4 символов' })
});

export type LoginValidationSchemaType = z.infer<typeof LoginValidationSchema>;
