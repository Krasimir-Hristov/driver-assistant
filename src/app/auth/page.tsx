import { AuthForm } from '@/components/auth/AuthForm';

export default function AuthPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <main className='flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-20'>
        <div className='w-full max-w-md'>
          <AuthForm />
        </div>
      </main>
    </div>
  );
}
