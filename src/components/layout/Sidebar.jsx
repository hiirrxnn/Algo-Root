import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  // Determine if the current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <aside className="w-64 bg-white border-r border-secondary-200 hidden md:block">
      <div className="h-full flex flex-col py-4">
        <div className="px-4 pb-4 mb-4 border-b border-secondary-200">
          <h2 className="text-xs font-semibold text-secondary-500 uppercase tracking-wider">
            Main Navigation
          </h2>
        </div>
        
        <div className="flex-1 px-2">
          <a
            href="/details"
            className={`nav-link flex items-center mb-2 ${
              isActive('/details') ? 'nav-link-active' : ''
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
            Details
          </a>
        </div>
        
        <div className="px-4 pt-4 mt-4 border-t border-secondary-200">
          <div className="bg-primary-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-primary-800 mb-2">
              Need Help?
            </h3>
            <p className="text-xs text-primary-700 mb-3">
              Check out our documentation for more information on using the dashboard.
            </p>
            <a
              href="#"
              className="text-xs font-medium text-primary-600 hover:text-primary-700"
            >
              View Documentation →
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;