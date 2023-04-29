import { User } from '../users/schemas/user.schema';

export const shuffleArray = (arr: User[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let position = Math.floor(Math.random() * (i + 1));

        let temp = arr[i];

        arr[i] = arr[position];
        arr[position] = temp;
    }

    return arr.slice(0, 4);
};
