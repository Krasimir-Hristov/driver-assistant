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
    <div className='min-h-screen bg-[#D40511]'>
      {/* Hero Section */}
      <div className='relative py-12 md:py-24'>
        <div className='absolute inset-0 bg-[#FFCC00] transform -skew-y-6 origin-top-left z-0'></div>
        
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-black text-[#D40511] uppercase mb-6 transform hover:scale-105 transition-transform duration-300'>
            Day Off Calendar
          </h1>
          
          <div className='max-w-3xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-4 border-[#D40511]'>
            <h2 className='text-2xl md:text-3xl font-black text-[#D40511] uppercase mb-4'>
              Select Your Group
            </h2>
            
            <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 md:gap-4 max-w-2xl mx-auto mb-6'>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((week) => (
                <button
                  key={week}
                  onClick={() => setStartWeek(week)}
                  className={`
                    relative overflow-hidden p-2 md:p-4
                    rounded-lg shadow-lg transform transition-all duration-300
                    hover:scale-110 hover:rotate-3
                    text-xl md:text-2xl font-black
                    ${startWeek === week
                      ? 'bg-[#FFCC00] text-[#D40511] border-4 border-[#D40511] scale-105'
                      : 'bg-white text-[#D40511] border-4 border-[#FFCC00] hover:border-[#D40511]'
                    }
                  `}
                >
                  {week}
                  {startWeek === week && (
                    <div className='absolute inset-0 bg-[#FFCC00] opacity-30 animate-pulse'></div>
                  )}
                </button>
              ))}
            </div>
            
            <p className='text-base md:text-lg text-gray-700'>
              Find your group number on your
              <span className='inline-block bg-[#FFCC00] text-[#D40511] font-black px-3 py-1 mx-2 rounded transform -rotate-2 hover:rotate-0 transition-transform duration-300 border-2 border-[#D40511]'>
                DHL
              </span>
              badge
            </p>
          </div>
        </div>
      </div>

      {/* Important Notice */}


      {/* Calendar Section */}
      <div className='relative min-h-screen pb-24'>
        <div className='absolute inset-0 bg-gradient-to-b from-[#D40511] via-white to-[#D40511] opacity-10'></div>
        
        <div className='relative z-10 flex flex-col items-center justify-center px-4 pt-8'>
          <div className='w-full max-w-7xl'>
            <WeeklyCalendar startWeek={startWeek} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayOffCalendar;
