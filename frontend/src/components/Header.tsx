
'use client';

import React, { useContext } from 'react';
import { Menu } from 'lucide-react';
import MenuContext from '@/context/MenuContext';

interface HeaderProps {
  status?: string;
  onMenuClick?: () => void;
}

function Header({ status = 'FOCUSING' }: HeaderProps) {

  const context = useContext(MenuContext);


  const onMenuClick = () => {
    context?.setIsModalOpen((prev: boolean) => !prev);
  }


  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card bg-opacity-40 backdrop-blur-sm font-mono">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-accent rounded">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <h1 className="text-lg font-medium text-foreground">Cockpit</h1>
      </div>

      {/* Status Badge and Menu */}
      <div className="flex items-center gap-4">
        {status && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {status}
            </span>
          </div>
        )}
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

export default Header;
