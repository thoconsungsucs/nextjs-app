'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MainErrorFallback } from '@/components/errors/main';
import { Notifications } from '@/components/ui/notifications';
import { queryConfig } from '@/lib/react-query';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {process.env.DEV && <ReactQueryDevtools />}
        <Notifications />
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

// This is the root provider component that wraps the entire application
// Key features and concepts:

// Keywords:
// - Provider Pattern: Implements React's Context Provider pattern
// - Error Handling: Uses ErrorBoundary for app-wide error catching
// - State Management: Sets up React Query for server state management
// - Development Tools: Includes React Query dev tools in dev mode
// - Notifications: Global notification system setup

// Main responsibilities:
// 1. Query Client Configuration
// - Initializes React Query client with default options
// - Provides query client context to all child components
// - Enables caching and state management for API calls

// 2. Error Handling
// - Catches and handles runtime errors gracefully
// - Displays user-friendly error fallback UI
// - Prevents complete app crashes

// 3. Development Features
// - Conditionally renders dev tools in development
// - Helps debug and monitor query states
// - Improves developer experience

// 4. UI Components
// - Renders global notification system
// - Maintains consistent layout structure
// - Handles child component rendering

// Usage:
// Wraps the root component in layout.tsx to provide
// these features throughout the application
