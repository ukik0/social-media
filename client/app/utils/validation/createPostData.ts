import {z} from "zod";

export const CreatePostSchema = z
    .object({
        title: z.string().min(5, { message: 'Поле обязательно и не менне 5 символов' }).max(40, {message: 'Поле не может быть длиннее 40 символов'}),
        category: z.string().min(5, { message: 'Поле обязательно и не менее 5 символов' }).max(25, {message: 'Поле не может быть длиннее 25 символов'}),
        tags: z.string().min(5, {message: 'Поле обязательно и не менее 5 символов '})
    })

export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;