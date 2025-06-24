import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Plus, Brain } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              Smart Resume Builder
            </span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>My Resumes</span>
            </Link>
            
            <Link
              to="/builder"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/builder'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Create Resume</span>
            </Link>
            
            <div className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-500">
              <Brain className="h-4 w-4" />
              <span>AI Powered</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
