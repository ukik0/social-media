import * as argon2 from 'argon2';

export const hashData = (data: string) => argon2.hash(data);
