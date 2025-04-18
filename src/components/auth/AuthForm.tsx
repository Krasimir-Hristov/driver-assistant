'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSupabase } from '../providers/SupabaseProvider';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = useSupabase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError('');
      setIsLoading(true);

      if (isSignIn) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (signUpError) throw signUpError;
      }

      router.push('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className='w-[400px] border-4 border-[#FFCC00] shadow-2xl transform hover:scale-[1.02] transition-all duration-300'>
      <CardHeader className='bg-[#D40511] text-white pb-8'>
        <div className='flex justify-center mb-6'>
          <div className='bg-[#FFCC00] text-[#D40511] px-4 py-2 rounded font-black text-2xl transform -rotate-2 hover:rotate-0 transition-transform border-2 border-white inline-block'>
            DHL
          </div>
        </div>
        <CardTitle className='text-3xl font-black text-center mb-2'>{isSignIn ? 'Welcome Back!' : 'Join DHL Driver Assistant'}</CardTitle>
        <CardDescription className='text-white/90 text-center text-lg'>
          {isSignIn
            ? 'Sign in to access your driver dashboard'
            : 'Create your account to get started'}
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-6 px-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[#D40511] font-bold uppercase text-sm'>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='example@email.com' 
                      {...field} 
                      className='border-2 border-gray-200 h-12 text-lg focus:border-[#FFCC00] transition-all duration-300'
                    />
                  </FormControl>
                  <FormMessage className='text-[#D40511] font-medium' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-[#D40511] font-bold uppercase text-sm'>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type='password' 
                      placeholder='******' 
                      {...field} 
                      className='border-2 border-gray-200 h-12 text-lg focus:border-[#FFCC00] transition-all duration-300'
                    />
                  </FormControl>
                  <FormMessage className='text-[#D40511] font-medium' />
                </FormItem>
              )}
            />
            {error && <p className='text-[#D40511] text-sm font-medium bg-red-50 p-3 rounded border border-red-100'>{error}</p>}
            <div className='flex flex-col gap-3 pt-2'>
              <Button 
                type='submit' 
                disabled={isLoading}
                className='bg-[#D40511] hover:bg-[#FFCC00] text-white hover:text-[#D40511] h-12 text-lg font-black uppercase transition-all duration-300 cursor-pointer transform hover:scale-105'
              >
                {isLoading ? 'Processing...' : isSignIn ? 'Sign In' : 'Create Account'}
              </Button>
              <Button
                type='button'
                variant='ghost'
                onClick={() => setIsSignIn(!isSignIn)}
                className='text-[#D40511] hover:text-[#D40511] hover:bg-[#FFCC00]/20 font-bold transition-all duration-300 cursor-pointer'
              >
                {isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
