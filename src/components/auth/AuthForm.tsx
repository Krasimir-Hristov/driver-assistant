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
import { supabase } from '@/lib/supabase';
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

      router.refresh();
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{isSignIn ? 'Sign In' : 'Sign Up'}</CardTitle>
        <CardDescription>
          {isSignIn
            ? 'Enter your credentials to sign in'
            : 'Create a new account to get started'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@email.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='******' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <div className='text-sm text-red-500'>{error}</div>}
            <div className='space-y-2'>
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Loading...' : isSignIn ? 'Sign In' : 'Sign Up'}
              </Button>
              <Button
                type='button'
                variant='ghost'
                className='w-full'
                onClick={() => setIsSignIn(!isSignIn)}
                disabled={isLoading}
              >
                {isSignIn
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
