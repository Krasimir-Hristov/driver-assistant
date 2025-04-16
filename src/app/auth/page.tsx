import { AuthForm } from '@/components/auth/AuthForm';

export default function AuthPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#D40511] to-[#FFCC00]'>
      <div className='absolute inset-0 bg-[url("/dhl-pattern.png")] bg-repeat bg-[length:200px_200px] opacity-10'></div>
      <main className='relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-20'>
        <AuthForm />
      </main>
    </div>
  );
}
