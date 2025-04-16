import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:px-20'>
        <h1 className='text-5xl font-bold mb-4'>Welcome to Driver Assistant</h1>
        <p className='text-xl mb-8 max-w-2xl'>
          Your personal driving companion helping you track routes, manage
          expenses, and optimize your journeys.
        </p>
        <Link href='/auth'>
          <Button size='lg' className='text-lg px-8'>
            Get Started
          </Button>
        </Link>
      </main>
    </div>
  );
}
