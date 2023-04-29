import { DateObject } from 'react-multi-date-picker';

export const formatDate = (date: DateObject[]): DateObject[] => {
    return [
        ...date.map((item) => [item.year, String(item.month).padStart(2, '0'), item.day].join('-'))
    ] as unknown as DateObject[];
};
