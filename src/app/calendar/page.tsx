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
    <div className='bg-slate-200'>
      <h1 className='text-red-800 font-extrabold justify-center text-center uppercase py-4 text-4xl decoration-red-800 md:text-6xl'>
        Day Off Calendar
      </h1>

      <div className='justify-center text-center mx-3'>
        <h2 className='text-red-800 font-extrabold uppercase py-4 text-3xl decoration-red-800'>
          My Group
        </h2>

        <p className='font-bold text-2xl'>
          Find your group in your (
          <span className='text-red-800 bg-yellow-500 font-extrabold rounded'>
            DHL
          </span>
          ) badge number.
        </p>

        <div className='mt-10 border-8 border-black bg-yellow-500'>
          <h3 className='font-extrabold text-red-800 text-3xl uppercase'>
            Important
          </h3>
          <p className='font-extrabold text-2xl'>
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
