
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Lock } from 'lucide-react';

const Unauthorized = () => {
  const { logout } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-4 animate-fade-in max-w-md">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mt-6">Access Denied</h1>
        <p className="text-muted-foreground">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button asChild variant="outline">
            <Link to="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
          <Button onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
