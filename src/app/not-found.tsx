import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';

const NotFoundPage = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href={paths.home.getHref()} replace>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

// This is the 404 Not Found page component
// It displays when users navigate to non-existent routes

// Key features:
// - Shows 404 error message
// - Provides link back to home page
// - Uses client-side navigation via Next.js Link
// - Maintains consistent styling with rest of app

