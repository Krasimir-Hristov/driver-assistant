import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export default function AuthorizedPage() {
  return (
    <main className='min-h-screen p-24'>
      <Card className='max-w-md mx-auto'>
        <CardHeader>
          <CardTitle>Authorized Area</CardTitle>
          <CardDescription>Welcome to your secured dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <p className='text-gray-600'>
              You are now in an authorized section of the application.
            </p>
            <Button variant='secondary'>Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
