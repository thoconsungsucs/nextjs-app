import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

import { AppProvider } from '@/app/provider';
import { getUserQueryOptions } from '@/lib/auth';

import '@/styles/globals.css';

export const metadata = {
  title: 'Bulletproof React',
  description: 'Showcasing Best Practices For Building React Applications',
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getUserQueryOptions());

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body>
        <AppProvider>
          <HydrationBoundary state={dehydratedState}>
            {children}
          </HydrationBoundary>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;

// We are not prerendering anything because the app is highly dynamic
// and the data depends on the user so we need to send cookies with each request
export const dynamic = 'force-dynamic';

// This is the root layout component for the Next.js application
// It sets up important app-wide configurations and providers:

// 1. Metadata configuration for SEO
// - Sets title and description for the app

// 2. Data fetching setup
// - Creates a new QueryClient instance
// - Prefetches initial user data
// - Dehydrates query state to enable client-side rehydration

// 3. Core app structure
// - Provides HTML boilerplate with language set to English
// - Wraps the app in providers for global state/context
// - Hydrates React Query state
// - Renders child components within the layout

// 4. Dynamic rendering
// - Forces dynamic rendering instead of static generation
// - This ensures fresh data on each request
// - Required because app state depends on user authentication/cookies

