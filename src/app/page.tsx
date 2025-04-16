import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='min-h-screen p-24'>
      <Card className='max-w-md mx-auto'>
        <CardHeader>
          <CardTitle>Welcome to Driver Assistant</CardTitle>
          <CardDescription>
            Your Next.js app with Shadcn UI is ready!
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button asChild>
            <Link href='/authorized'>Go to Authorized Area</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
