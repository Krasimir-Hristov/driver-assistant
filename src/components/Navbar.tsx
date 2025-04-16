'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav className='bg-[#D40511] sticky top-0 z-50'>
      <div className='h-1 bg-[#FFCC00]'></div>
      <div className='flex h-16 items-center px-4 container mx-auto'>
        <div className='mr-8 font-bold'>
          <Link href='/' className='flex items-center gap-3 group'>
            <div className='bg-[#FFCC00] text-[#D40511] px-4 py-2 rounded font-black text-2xl transform -rotate-2 group-hover:rotate-0 transition-transform border-2 border-white'>DHL</div>
            <span className='text-white font-bold hidden sm:inline text-xl uppercase'>Driver Assistant</span>
          </Link>
        </div>
        <div className='flex items-center flex-1'>
          <div className='flex-1'></div>
          {!isAuthenticated ? (
            <Button variant='ghost' asChild className='bg-[#FFCC00] text-[#D40511] hover:bg-white font-black uppercase cursor-pointer transition-all duration-300 px-6 transform hover:scale-105'>
              <Link href='/auth'>Sign In</Link>
            </Button>
          ) : (
            <Button variant='ghost' onClick={handleLogout} className='bg-white text-[#D40511] hover:bg-[#FFCC00] font-black uppercase cursor-pointer transition-all duration-300 px-6 transform hover:scale-105'>
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
