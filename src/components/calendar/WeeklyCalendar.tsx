'use client';

import React, { useState, useEffect } from 'react';
import { weekOffDays } from '@/constants';
import { DayType, CalendarModification } from '@/types/calendar';
import DayModificationModal from './DayModificationModal';
import { useSupabase } from '@/components/providers/SupabaseProvider';
import { fetchUserModifications, upsertModification } from '@/lib/calendarApi';
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
  const supabase = useSupabase();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dayModifications, setDayModifications] = useState<Record<string, DayType>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadModifications() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const modifications = await fetchUserModifications(supabase, user.id);
        const modMap: Record<string, DayType> = {};
        modifications.forEach(mod => {
          modMap[mod.date] = mod.day_type;
        });
        setDayModifications(modMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load modifications');
      } finally {
        setLoading(false);
      }
    }

    loadModifications();
  }, [supabase.auth]);

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

      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const modification = dayModifications[dateStr];
      const dayType: DayType = isSunday ? 'off' : (modification || (isOffDay ? 'off' : 'work'));

      dates.push({
        date: currentDate,
        dayType,
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

  const handleDayTypeChange = async (type: DayType) => {
    if (!selectedDate) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) {
        setError('Please sign in to modify calendar');
        return;
      }

      await upsertModification(supabase, user.id, format(selectedDate, 'yyyy-MM-dd'), type);
      setDayModifications(prev => ({
        ...prev,
        [format(selectedDate, 'yyyy-MM-dd')]: type,
      }));
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update modification');
    }
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
            {format(currentMonth, 'MMMM yyyy')}
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
              className='p-1 sm:p-2 md:p-3 text-center font-black text-[#D40511] bg-[#FFCC00] rounded-lg shadow-lg uppercase border border-[#D40511] sm:border-2 transform hover:scale-105 transition-transform duration-300'
              style={{
                fontSize: 'clamp(0.625rem, 1vw, 0.875rem)'
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className='grid grid-cols-7 gap-1 sm:gap-2 md:gap-4'>
          {dates.map(({ date, dayType }, index) => (
            <div
              key={index}
              onClick={() => {
                const dayOfWeek = getDay(date);
                if (dayOfWeek !== 0) { // Не позволяваме промяна на неделите
                  setSelectedDate(date);
                  setIsModalOpen(true);
                }
              }}
              className={`p-1.5 sm:p-2 md:p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 shadow-lg border-2 md:border-4 ${getDay(date) === 0 ? '' : 'cursor-pointer'} ${
                getDay(date) === 0 ? 'bg-gray-100 text-gray-500 border-gray-300' :
                dayType === 'work' ? 'bg-[#FFCC00] text-[#D40511] border-[#D40511]' :
                dayType === 'off' ? 'bg-[#22C55E] text-white border-[#D40511] font-black transform -rotate-1 hover:rotate-0' :
                dayType === 'vacation' ? 'bg-blue-500 text-white border-[#D40511]' :
                dayType === 'sick' ? 'bg-red-500 text-white border-[#D40511]' :
                'bg-purple-500 text-white border-[#D40511]'
              }`}
            >
              <div style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }} className='font-black'>
                {format(date, 'd')}
              </div>
              <div style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.75rem)' }} className='mt-0.5 sm:mt-1 md:mt-2 font-bold'>
                {getDay(date) === 0 ? 'SUNDAY' :
                 dayType === 'work' ? 'WORK DAY' :
                 dayType === 'off' ? 'DAY OFF' :
                 dayType === 'vacation' ? 'VACATION' :
                 dayType === 'sick' ? 'SICK LEAVE' :
                 'ADD. VACATION'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDate && (
        <DayModificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleDayTypeChange}
          currentDate={selectedDate}
          currentType={dates.find(d => d.date.getTime() === selectedDate.getTime())?.dayType || 'work'}
        />
      )}
    </div>
  );
};

export default WeeklyCalendar;
