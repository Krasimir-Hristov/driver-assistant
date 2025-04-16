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
    <div className='max-w-4xl mx-auto p-2 md:p-4'>
      {/* Navigation */}
      <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mb-6'>
        <button
          onClick={handlePreviousMonth}
          className='w-full sm:w-32 p-2 md:p-3 bg-[#D40511] text-white rounded-lg font-bold uppercase hover:bg-[#FFCC00] hover:text-[#D40511] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base'
        >
          Previous
        </button>
        <h2 className='text-xl md:text-2xl font-black text-[#D40511] bg-[#FFCC00] px-4 md:px-6 py-2 rounded-lg transform -rotate-1 hover:rotate-0 transition-transform border-2 border-white shadow-lg'>
          {format(currentMonth, 'MMM yyyy')}
        </h2>
        <button
          onClick={handleNextMonth}
          className='w-full sm:w-32 p-2 md:p-3 bg-[#D40511] text-white rounded-lg font-bold uppercase hover:bg-[#FFCC00] hover:text-[#D40511] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base'
        >
          Next
        </button>
      </div>

      {/* Days of Week Header */}
      <div className='grid grid-cols-7 gap-1 md:gap-2 mb-2'>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
          <div
            key={day}
            className='p-1 md:p-2 text-center font-black text-[#D40511] bg-[#FFCC00] rounded-lg shadow-md uppercase text-xs md:text-base'
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className='grid grid-cols-7 gap-1 md:gap-2'>
        {dates.map(({ date, isOffDay, isSunday }, index) => (
          <div
            key={index}
            className={`p-2 md:p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 shadow-lg border-2 ${
              isOffDay
                ? 'bg-[#FFCC00] text-[#D40511] border-[#D40511] font-black'
                : isSunday
                ? 'bg-gray-100 text-gray-500 border-gray-300'
                : 'bg-white text-[#D40511] border-[#FFCC00]'
            }`}
          >
            <div className='text-base md:text-lg font-bold'>{format(date, 'd')}</div>
            <div className='text-[10px] md:text-xs mt-1 font-bold'>
              {isOffDay ? 'OFF' : isSunday ? 'SUN' : 'WORK'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
