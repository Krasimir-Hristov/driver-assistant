import React, { useState } from 'react';
import { weekOffDays } from '@/constants';
import {
  format,
  addDays,
  startOfWeek,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  getDay,
  differenceInCalendarWeeks,
} from 'date-fns';

type Props = {
  startWeek: number;
};

const WeeklyCalendar: React.FC<Props> = ({ startWeek }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calculateWeekNumber = (
    startWeek: number,
    currentDate: Date,
    baseDate: Date
  ) => {
    const totalWeeks = differenceInCalendarWeeks(currentDate, baseDate, {
      weekStartsOn: 1,
    });
    return ((startWeek - 1 + totalWeeks) % 9) + 1;
  };

  const generateDates = (startWeek: number, currentMonth: Date) => {
    const baseDate = new Date(2022, 0, 1); // 1st January 2022
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfMonth(currentMonth);
    const dates = [];
    let currentDate = start;

    while (currentDate <= end) {
      const weekNumber = calculateWeekNumber(startWeek, currentDate, baseDate);
      const dayOfWeek = getDay(currentDate);
      const offDays = weekOffDays[weekNumber] || [];
      const isOffDay = offDays.includes(dayOfWeek);
      const isSunday = dayOfWeek === 0;

      dates.push({
        date: currentDate,
        isOffDay,
        isSunday,
      });

      currentDate = addDays(currentDate, 1);
    }

    return dates;
  };

  const dates = generateDates(startWeek, currentMonth);

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  return (
    <div className='max-w-md mx-auto p-4'>
      <div className='flex justify-between items-center mb-4'>
        <button
          onClick={handlePreviousMonth}
          className='p-2 bg-red-800 w-24 text-white rounded hover:bg-yellow-500 hover:text-red-800 transition-colors duration-300'
        >
          Previous
        </button>
        <h2 className='text-lg font-bold text-red-800'>
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={handleNextMonth}
          className='p-2 bg-red-800 w-24 text-white rounded hover:bg-yellow-500 hover:text-red-800 transition-colors duration-300'
        >
          Next
        </button>
      </div>
      <div className='grid grid-cols-7 gap-1 sm:gap-2'>
        {dates.map(({ date, isOffDay, isSunday }, index) => (
          <div
            key={index}
            className={`p-2 sm:p-3 border rounded-md text-xs sm:text-sm font-semibold
              ${
                isOffDay
                  ? 'bg-green-500 text-white'
                  : isSunday
                  ? 'bg-gray-500 text-white'
                  : 'bg-yellow-500 text-red-800'
              }
              transition-all duration-300 hover:scale-105
            `}
          >
            {format(date, 'EEE, MMM d')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
