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
    <div className='min-h-screen bg-[#D40511]'>
      {/* Hero Section */}
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#D40511] to-[#FFCC00] opacity-90'></div>
        <div className='relative container mx-auto px-4 pt-16 pb-24 sm:pt-24 sm:pb-32'>
          <div className='text-center space-y-8 relative z-10'>
            <div className='inline-block bg-[#FFCC00] p-4 rounded-lg shadow-lg mb-6 transition-all duration-300 transform hover:-rotate-2 border-4 border-white'>
              <h2 className='text-[#D40511] text-3xl font-black uppercase'>DHL Driver Assistant</h2>
            </div>
            <h1 className='text-5xl sm:text-7xl font-black tracking-tight text-white animate-fade-in uppercase'>
              Welcome to<br />
              <span className='text-dhl-yellow'>Driver Assistant</span>
            </h1>
            <p className='text-xl sm:text-2xl text-white max-w-2xl mx-auto leading-relaxed font-medium'>
              Your intelligent driving companion for smarter, more efficient journeys.
            </p>
            <div className='flex justify-center gap-4 pt-4'>
              <Link href='/auth'>
                <Button size='lg' className='text-xl px-12 py-6 hover:scale-105 transition-all duration-300 bg-[#FFCC00] hover:bg-white text-[#D40511] font-black uppercase shadow-xl cursor-pointer'>
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Features Grid */}
      <main className='container mx-auto px-4 py-16 bg-gradient-to-b from-[#FFCC00] to-white'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          <div className='col-span-full mb-16 text-center bg-[#D40511] -mt-32 rounded-lg shadow-2xl p-8 transform rotate-1 border-4 border-[#FFCC00]'>
            <h2 className='text-4xl font-black text-[#FFCC00] mb-4 uppercase'>Streamline Your Deliveries</h2>
            <p className='text-white text-xl max-w-2xl mx-auto font-medium'>Powerful tools designed specifically for DHL drivers</p>
          </div>

          <div className='bg-[#D40511] p-8 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 group transform -rotate-1'>
            <div className='absolute top-0 left-0 w-full h-2 bg-[#FFCC00] transform origin-left scale-x-0 transition-transform group-hover:scale-x-100'></div>
            <div className='flex items-center gap-4 mb-4'>
              <div className='p-3 bg-[#FFCC00] rounded-lg transform rotate-3'>
                <Route className='w-8 h-8 text-[#D40511]' />
              </div>
              <h3 className='text-2xl font-black text-white uppercase'>Route Tracking</h3>
            </div>
            <p className='text-white/90 text-lg'>Record and analyze your driving routes with detailed statistics and insights.</p>
          </div>

          <div className='bg-[#D40511] p-8 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 group transform rotate-1'>
            <div className='absolute top-0 left-0 w-full h-2 bg-[#FFCC00] transform origin-left scale-x-0 transition-transform group-hover:scale-x-100'></div>
            <div className='flex items-center gap-4 mb-4'>
              <div className='p-3 bg-[#FFCC00] rounded-lg transform -rotate-3'>
                <PiggyBank className='w-8 h-8 text-[#D40511]' />
              </div>
              <h3 className='text-2xl font-black text-white uppercase'>Expense Management</h3>
            </div>
            <p className='text-white/90 text-lg'>Track fuel costs, maintenance expenses, and other vehicle-related spending.</p>
          </div>

          <div className='bg-[#D40511] p-8 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 group transform -rotate-1'>
            <div className='absolute top-0 left-0 w-full h-2 bg-[#FFCC00] transform origin-left scale-x-0 transition-transform group-hover:scale-x-100'></div>
            <div className='flex items-center gap-4 mb-4'>
              <div className='p-3 bg-[#FFCC00] rounded-lg transform rotate-3'>
                <BarChart3 className='w-8 h-8 text-[#D40511]' />
              </div>
              <h3 className='text-2xl font-black text-white uppercase'>Performance Analytics</h3>
            </div>
            <p className='text-white/90 text-lg'>Get detailed insights into your driving patterns and vehicle performance.</p>
          </div>

          <div className='bg-[#D40511] p-8 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 group transform rotate-1'>
            <div className='absolute top-0 left-0 w-full h-2 bg-[#FFCC00] transform origin-left scale-x-0 transition-transform group-hover:scale-x-100'></div>
            <div className='flex items-center gap-4 mb-4'>
              <div className='p-3 bg-[#FFCC00] rounded-lg transform -rotate-3'>
                <Car className='w-8 h-8 text-[#D40511]' />
              </div>
              <h3 className='text-2xl font-black text-white uppercase'>Vehicle Management</h3>
            </div>
            <p className='text-white/90 text-lg'>Keep track of maintenance schedules, repairs, and vehicle documentation.</p>
          </div>
        </div>
      </main>
      {/* Bottom Banner */}
      <div className='bg-gradient-to-r from-[#D40511] via-[#FFCC00] to-[#D40511] relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#D40511]/50 to-[#FFCC00]/50'></div>
        <div className='container mx-auto px-4 py-16 text-center relative z-10'>
          <h2 className='text-4xl font-black text-white mb-6 uppercase'>Ready to Optimize Your Routes?</h2>
          <p className='text-xl text-white mb-8 font-medium'>Join the DHL driver community and make your deliveries more efficient.</p>
          <Link href='/auth'>
            <Button size='lg' className='bg-white hover:bg-[#FFCC00] text-[#D40511] font-black text-xl px-12 py-6 uppercase transform hover:scale-105 transition-all duration-300 shadow-2xl cursor-pointer'>
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
