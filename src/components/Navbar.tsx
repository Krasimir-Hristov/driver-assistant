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
    <nav className='border-b'>
      <div className='flex h-16 items-center px-4 container mx-auto'>
        <div className='mr-4 font-bold'>
          <Link href='/'>Driver Assistant</Link>
        </div>
        <div className='flex space-x-2'>
          <Button variant='ghost' asChild>
            <Link href='/'>Home</Link>
          </Button>
          <Button variant='ghost' asChild>
            <Link href='/authorized'>Authorized</Link>
          </Button>
          {!isAuthenticated ? (
            <Button variant='ghost' asChild>
              <Link href='/auth'>SignIN-SignUp</Link>
            </Button>
          ) : (
            <Button variant='ghost' onClick={handleLogout}>
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
