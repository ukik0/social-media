import { Dispatch, FC, SetStateAction } from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { Calendar, DateObject, Value } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import 'react-multi-date-picker/styles/colors/purple.css';

import { formatDate, useOutside } from '@/utils';

import cn from 'classnames';

import cl from './Filter.module.scss';

interface FilterProps {
    date: DateObject[];
    setDate: Dispatch<SetStateAction<DateObject[]>>;
}

export const Filter: FC<FilterProps> = ({ date, setDate }) => {
    const { ref, isShow, setIsShow } = useOutside(false);

    return (
        <>
            <Calendar
                ref={ref}
                value={date as Value}
                onChange={(date: DateObject[]) => setDate(formatDate(date))}
                range
                rangeHover
                className={`${cn(cl.date, { [cl.active]: isShow })} bg-dark purple`}
                shadow={true}
            />

            <BsFillCalendarDateFill className={cl.icon} onClick={() => setIsShow((prev) => !prev)} />
        </>
    );
};
