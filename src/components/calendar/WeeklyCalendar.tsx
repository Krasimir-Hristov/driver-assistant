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
    <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 pb-12 md:pb-24'>
      <div className='bg-white rounded-lg shadow-2xl p-3 sm:p-4 md:p-6 border-4 border-[#D40511] transform hover:scale-[1.01] transition-all duration-300'>
        {/* Navigation */}
        <div className='flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 md:mb-8'>
          <button
            onClick={handlePreviousMonth}
            className='w-full sm:w-32 md:w-40 p-2 md:p-4 bg-[#D40511] text-white rounded-lg font-black uppercase hover:bg-[#FFCC00] hover:text-[#D40511] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base'
          >
            Prev
          </button>
          <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-[#D40511] bg-[#FFCC00] px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-lg transform -rotate-2 hover:rotate-0 transition-transform border-2 md:border-4 border-[#D40511] shadow-lg whitespace-nowrap'>
            {format(currentMonth, window.innerWidth < 640 ? 'MMM yy' : 'MMMM yyyy')}
          </h2>
          <button
            onClick={handleNextMonth}
            className='w-full sm:w-32 md:w-40 p-2 md:p-4 bg-[#D40511] text-white rounded-lg font-black uppercase hover:bg-[#FFCC00] hover:text-[#D40511] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base'
          >
            Next
          </button>
        </div>

        {/* Days of Week Header */}
        <div className='grid grid-cols-7 gap-1 sm:gap-2 md:gap-4 mb-2 md:mb-4'>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div
              key={day}
              className='p-1 sm:p-2 md:p-3 text-center font-black text-[#D40511] bg-[#FFCC00] rounded-lg shadow-lg uppercase text-[10px] sm:text-xs md:text-sm border border-[#D40511] sm:border-2 transform hover:scale-105 transition-transform duration-300'
            >
              {window.innerWidth < 640 ? day.charAt(0) : window.innerWidth < 768 ? day.slice(0, 2) : day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className='grid grid-cols-7 gap-1 sm:gap-2 md:gap-4'>
          {dates.map(({ date, isOffDay, isSunday }, index) => (
            <div
              key={index}
              className={`p-1.5 sm:p-2 md:p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 shadow-lg border-2 md:border-4 ${
                isOffDay
                  ? 'bg-[#22C55E] text-white border-[#D40511] font-black transform -rotate-1 hover:rotate-0'
                  : isSunday
                  ? 'bg-gray-100 text-gray-500 border-gray-300'
                  : 'bg-white text-[#D40511] border-[#FFCC00] hover:border-[#D40511]'
              }`}
            >
              <div className='text-base sm:text-lg md:text-xl lg:text-2xl font-black'>{format(date, 'd')}</div>
              <div className='text-[8px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1 md:mt-2 font-bold'>
                {window.innerWidth < 640 
                  ? (isOffDay ? 'OFF' : isSunday ? 'SUN' : 'WORK')
                  : (isOffDay ? 'DAY OFF' : isSunday ? 'SUNDAY' : 'WORK DAY')
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
