import Link from 'next/link';
import { Button } from './ui/button';

export function Navbar() {
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
          <Button variant='ghost' asChild>
            <Link href='/auth'>SignIN-SignUp</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
