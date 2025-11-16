
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please enter both email and password.',
      });
      return;
    }

    // This is a mock authentication system.
    // In a real application, you would validate credentials against a backend.
    
    // Store email to help dashboard layout determine role
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockUserEmail', email);
    }

    switch (email) {
      case 'admin@platepal.com':
        router.push('/admin');
        break;
      case 'restaurant@gmail.com':
        router.push('/dashboard/provider');
        break;
      case 'ngo@gmail.com':
        router.push('/dashboard/ngo');
        break;
      case 'driver@gmail.com':
        router.push('/dashboard/driver');
        break;
      default:
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid email or password.',
        });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="relative flex justify-center">
            <Button variant="ghost" size="icon" className="absolute left-0 top-0" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
            <div className="text-center">
                <CardTitle className="font-headline text-2xl">Sign In</CardTitle>
                <CardDescription>Welcome back! Please enter your details.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
