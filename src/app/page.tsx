import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import Link from 'next/link';
import { AuthForm } from '@/components/auth/AuthForm';

export default function Home() {
  return (
    <main className='min-h-screen flex items-center justify-center p-24'>
      <AuthForm />
    </main>
  );
}
