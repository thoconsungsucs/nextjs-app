import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { Discussion } from '@/app/app/discussions/[discussionId]/_components/discussion';
import { getInfiniteCommentsQueryOptions } from '@/features/comments/api/get-comments';
import {
  getDiscussion,
  getDiscussionQueryOptions,
} from '@/features/discussions/api/get-discussion';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ discussionId: string }>;
}) => {
  const discussionId = (await params).discussionId;

  const discussion = await getDiscussion({ discussionId });

  return {
    title: discussion.data?.title,
    description: discussion.data?.title,
  };
};

const preloadData = async (discussionId: string) => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getDiscussionQueryOptions(discussionId)),
    queryClient.prefetchInfiniteQuery(
      getInfiniteCommentsQueryOptions(discussionId),
    ),
  ]);

  return {
    dehydratedState: dehydrate(queryClient),
  };
};

const PublicDiscussionPage = async ({
  params: { discussionId },
}: {
  params: {
    discussionId: string;
  };
}) => {
  const { dehydratedState } = await preloadData(discussionId);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Discussion discussionId={discussionId} />
    </HydrationBoundary>
  );
};

export default PublicDiscussionPage;

// This is a Next.js page component for displaying public discussions
// It handles dynamic routing and data fetching for individual discussion pages

// Keywords:
// - Dynamic Routing: Uses Next.js dynamic route parameter [discussionId]
// - Server Components: Leverages Next.js server components for data fetching
// - Metadata Generation: Dynamic metadata based on discussion content
// - Data Preloading: Prefetches discussion and comments data
// - Hydration: Uses React Query hydration for client-side state management
// - Query Client: Configures and manages data fetching state
// - Infinite Queries: Handles paginated comment loading
// - Type Safety: TypeScript types for props and parameters

// Key Features:
// 1. Dynamic Metadata
// - Generates SEO-friendly metadata from discussion title
// - Updates page title and description dynamically

// 2. Data Prefetching
// - Preloads discussion details before render
// - Prefetches initial set of comments
// - Uses React Query for data management

// 3. Component Structure
// - Async server component for initial render
// - Hydrates client-side state
// - Renders Discussion component with data

// Usage:
// - Accessed via /public/discussions/[discussionId] route
// - Handles both authenticated and unauthenticated users
// - Provides seamless SSR to CSR transition

