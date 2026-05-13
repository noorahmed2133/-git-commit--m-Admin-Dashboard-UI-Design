import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
        <AlertCircle size={40} />
      </div>
      <h1 className="text-4xl mb-2">404</h1>
      <h2 className="text-xl text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
}
