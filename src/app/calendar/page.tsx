'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WeeklyCalendar from '@/components/calendar/WeeklyCalendar';
import { supabase } from '@/lib/supabase';

const DayOffCalendar = () => {
  const [startWeek, setStartWeek] = useState<number>(1);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className='min-h-screen bg-slate-200 px-4 py-6 md:px-8'>
      <h1 className='text-[#D40511] font-extrabold text-center uppercase py-4 text-3xl md:text-5xl lg:text-6xl mb-4'>
        Day Off Calendar
      </h1>

      <div className='max-w-lg mx-auto text-center mb-8'>
        <h2 className='text-[#D40511] font-extrabold uppercase py-2 md:py-4 text-2xl md:text-3xl mb-4'>
          My Group
        </h2>

        <p className='font-bold text-lg md:text-2xl mb-6'>
          Find your group in your
          <span className='text-[#D40511] bg-[#FFCC00] font-extrabold rounded-lg px-3 py-1 mx-2 inline-block transform -rotate-1'>
            DHL
          </span>
          badge number.
        </p>

        <div className='bg-[#FFCC00] rounded-lg p-4 md:p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300'>
          <h3 className='font-extrabold text-[#D40511] text-xl md:text-3xl uppercase mb-2'>
            Important
          </h3>
          <p className='font-bold text-lg md:text-2xl text-[#D40511]'>
            Please check your calendar regularly for any updates or changes.
          </p>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center min-h-screen text-center px-4 pt-12 md:pt-0 bg-slate-200'>
        <div className='mt-5 border-black p-2 border-8'>
          <h1 className='font-bold text-2xl md:text-4xl border-b-4 border-red-500 pb-2'>
            Check Your Days Off
          </h1>
          <h2 className='text-xl font-bold mt-5'>Choose Your Group</h2>
          <div className='flex flex-row p-3 justify-center items-center mt-4 gap-3 border-b-4 border-yellow-500 md:gap-5 font-semibold'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((week) => (
              <p
                key={week}
                onClick={() => setStartWeek(week)}
                className={`p-1 md:p-2 border-2 border-black rounded-md cursor-pointer ${
                  startWeek === week ? 'bg-green-500' : 'bg-white'
                }`}
                style={{ minWidth: '1.5rem', textAlign: 'center' }}
              >
                {week}
              </p>
            ))}
          </div>

          <WeeklyCalendar startWeek={startWeek} />
        </div>
      </div>
    </div>
  );
};

export default DayOffCalendar;
