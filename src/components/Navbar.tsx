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
    <nav className='border-b bg-white shadow-sm'>
      <div className='flex h-16 items-center px-4 container mx-auto'>
        <div className='mr-4 font-bold'>
          <Link href='/' className='text-dhl-red hover:text-dhl-red/90 flex items-center gap-2'>
            <span className='text-2xl font-bold'>DHL</span>
            <span className='text-dhl-gray'>Driver Assistant</span>
          </Link>
        </div>
        <div className='flex space-x-2'>
          <Button variant='ghost' asChild className='text-dhl-gray hover:text-dhl-red hover:bg-dhl-red/10'>
            <Link href='/'>Home</Link>
          </Button>
          <Button variant='ghost' asChild className='text-dhl-gray hover:text-dhl-red hover:bg-dhl-red/10'>
            <Link href='/authorized'>Authorized</Link>
          </Button>
          {!isAuthenticated ? (
            <Button variant='ghost' asChild className='text-dhl-gray hover:text-dhl-red hover:bg-dhl-red/10'>
              <Link href='/auth'>SignIN-SignUp</Link>
            </Button>
          ) : (
            <Button variant='ghost' onClick={handleLogout} className='text-dhl-gray hover:text-dhl-red hover:bg-dhl-red/10'>
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
