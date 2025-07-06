'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

type LayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === paths.auth.login.getHref();
  const title = isLoginPage
    ? 'Log in to your account'
    : 'Register your account';

  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  useEffect(() => {
    if (user.data) {
      router.replace(
        `${redirectTo ? `${decodeURIComponent(redirectTo)}` : paths.app.dashboard.getHref()}`,
      );
    }
  }, [user.data, router, redirectTo]);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link
            className="flex items-center text-white"
            href={paths.home.getHref()}
          >
            <img className="h-24 w-auto" src="/logo.svg" alt="Workflow" />
          </Link>
        </div>

        <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};

// This is the authentication layout component that provides the structure
// for login and registration pages

// Keywords:
// - Authentication: Handles login/register page layouts
// - Protected Routes: Redirects authenticated users
// - Responsive Design: Mobile-first layout with Tailwind CSS
// - Client-side Navigation: Uses Next.js routing
// - User Management: Tracks user authentication state
// - Redirection: Handles post-login navigation
// - Layout Component: Reusable wrapper for auth pages

// Key Features:
// 1. User State Management
// - Checks authentication status via useUser hook
// - Redirects authenticated users to dashboard/specified route
// - Handles URL redirect parameters

// 2. Dynamic Content
// - Switches title between login/register contexts
// - Maintains consistent branding with logo
// - Provides centered card layout for auth forms

// 3. Navigation
// - Logo links back to home page
// - Handles redirect URLs via search params
// - Uses Next.js router for client-side navigation

// 4. Styling
// - Responsive layout with Tailwind CSS
// - Consistent spacing and typography
// - Mobile and desktop optimized design

// Usage:
// Wraps authentication-related pages like:
// - Login form
// - Registration form
// - Password reset form
