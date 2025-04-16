import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Car,
  BarChart3,
  Route,
  PiggyBank
} from 'lucide-react';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-dhl-yellow/10'>
      {/* Hero Section */}
      <main className='container mx-auto px-4 pt-16 pb-8 sm:pt-24'>
        <div className='text-center space-y-8'>
          <h1 className='text-4xl sm:text-6xl font-extrabold tracking-tight text-dhl-red animate-fade-in'>
            Welcome to Driver Assistant
          </h1>
          <p className='text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
            Your intelligent driving companion for smarter, more efficient journeys.
          </p>
          <div className='flex justify-center gap-4'>
            <Link href='/auth'>
              <Button size='lg' className='text-lg px-8 hover:scale-105 transition-transform bg-dhl-red hover:bg-dhl-red/90 text-white'>
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className='mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
          <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-dhl-red'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='p-2 bg-dhl-yellow rounded-lg'>
                <Route className='w-6 h-6 text-dhl-red' />
              </div>
              <h3 className='text-xl font-semibold'>Route Tracking</h3>
            </div>
            <p className='text-muted-foreground'>Record and analyze your driving routes with detailed statistics and insights.</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-dhl-red'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='p-2 bg-dhl-yellow rounded-lg'>
                <PiggyBank className='w-6 h-6 text-dhl-red' />
              </div>
              <h3 className='text-xl font-semibold'>Expense Management</h3>
            </div>
            <p className='text-muted-foreground'>Track fuel costs, maintenance expenses, and other vehicle-related spending.</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-dhl-red'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='p-2 bg-dhl-yellow rounded-lg'>
                <BarChart3 className='w-6 h-6 text-dhl-red' />
              </div>
              <h3 className='text-xl font-semibold'>Performance Analytics</h3>
            </div>
            <p className='text-muted-foreground'>Get detailed insights into your driving patterns and vehicle performance.</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-l-4 border-dhl-red'>
            <div className='flex items-center gap-4 mb-4'>
              <div className='p-2 bg-dhl-yellow rounded-lg'>
                <Car className='w-6 h-6 text-dhl-red' />
              </div>
              <h3 className='text-xl font-semibold'>Vehicle Management</h3>
            </div>
            <p className='text-muted-foreground'>Keep track of maintenance schedules, repairs, and vehicle documentation.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
