
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Menu, 
  Bell, 
  Search, 
  X,
  User,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-dashboard-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-dashboard-border">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-dashboard-primary flex items-center justify-center">
                <span className="text-white font-bold">MD</span>
              </div>
              <span className="font-semibold text-dashboard-text">MediDash</span>
            </div>
          ) : (
            <div className="mx-auto h-8 w-8 rounded-md bg-dashboard-primary flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-dashboard-text"
          >
            <Menu size={20} />
          </Button>
        </div>

        {/* Sidebar content */}
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {[
              { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
              { name: 'Patients', icon: Users, path: '/patients' },
              { name: 'Reports', icon: FileText, path: '/reports' },
              { name: 'Settings', icon: Settings, path: '/settings' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  item.path === '/' 
                    ? "bg-dashboard-primary text-white" 
                    : "text-dashboard-secondary hover:bg-dashboard-background hover:text-dashboard-primary"
                )}
              >
                <item.icon size={20} />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-dashboard-border">
          {sidebarOpen ? (
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="User" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-dashboard-text">Dr. John Doe</p>
                <p className="text-xs text-dashboard-secondary">Radiologist</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="User" className="h-full w-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div 
        className={cn(
          "flex flex-col flex-1 overflow-hidden transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* Header */}
        <header className="h-16 border-b border-dashboard-border bg-white flex items-center justify-between px-6">
          <div className="flex items-center space-x-4 w-1/2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dashboard-secondary" />
              <Input 
                placeholder="Search..." 
                className="pl-10 border-dashboard-border bg-dashboard-background text-dashboard-text"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-dashboard-secondary">
              <Bell size={20} />
            </Button>
            <div className="relative">
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2"
                onClick={toggleProfileDropdown}
              >
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" alt="User" className="h-full w-full object-cover" />
                </div>
                <span className="text-sm font-medium text-dashboard-text">Dr. John Doe</span>
              </Button>
              
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm text-dashboard-text hover:bg-dashboard-background"
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </button>
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm text-dashboard-text hover:bg-dashboard-background"
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </button>
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-dashboard-background"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
