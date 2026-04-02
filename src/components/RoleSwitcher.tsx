import React from 'react';
import { User, ShieldCheck, Eye } from 'lucide-react';
import { UserRole } from '../types';
import { cn } from '../lib/utils';

interface RoleSwitcherProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ role, setRole }) => {
  return (
    <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-border">
      <button
        onClick={() => setRole('viewer')}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
          role === 'viewer' 
            ? "bg-white text-ink shadow-sm" 
            : "text-gray-500 hover:text-ink"
        )}
      >
        <Eye size={14} />
        Viewer
      </button>
      <button
        onClick={() => setRole('admin')}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
          role === 'admin' 
            ? "bg-white text-ink shadow-sm" 
            : "text-gray-500 hover:text-ink"
        )}
      >
        <ShieldCheck size={14} />
        Admin
      </button>
    </div>
  );
};

export default RoleSwitcher;
