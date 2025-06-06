import React from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings, Shield, LogOut, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import useDemoMode from '@/hooks/useDemoMode';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

interface SettingsDropdownProps {
  className?: string;
}

const SettingsDropdown = ({ className }: SettingsDropdownProps) => {
  const { toast } = useToast();
  const { isDemoMode, toggleDemoMode } = useDemoMode();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDemoToggle = () => {
    toggleDemoMode();
    toast({
      title: isDemoMode ? "Demo Mode Disabled" : "Demo Mode Enabled",
      description: isDemoMode 
        ? "Now connected to live data from the blockchain." 
        : "Using demo data for demonstration purposes.",
    });
  };
  
  const handleAdminAccess = () => {
    navigate('/admin');
  };

  const handleLogout = () => {
    logout();
  };

  const handleRefreshDashboard = () => {
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={`h-8 w-8 ${className}`}>
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Dashboard Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDemoToggle}>
          {isDemoMode ? "Disable Demo Mode" : "Enable Demo Mode"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleRefreshDashboard}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleAdminAccess} className="text-[#6D28D9] font-medium">
          <Shield className="h-4 w-4 mr-2" />
          Admin Access
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;
