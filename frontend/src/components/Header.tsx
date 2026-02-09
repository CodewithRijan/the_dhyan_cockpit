
'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Menu, Settings } from 'lucide-react';

import MenuContext from '@/context/MenuContext';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  status?: string;
  onMenuClick?: () => void;
}

function Header({ status = 'FOCUSING' }: HeaderProps) {

  const context = useContext(MenuContext);


  const onMenuClick = () => {
    context?.setIsModalOpen((prev: boolean) => !prev);
  }

  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsNavOpen(false);
      }
    };

    if (isNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isNavOpen]);

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
        {/* Navigation Menu */}
        <div className="relative" ref={navRef}>
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
            aria-label="Navigation"
            aria-expanded={isNavOpen}
          >
            <Menu className="w-5 h-5" />
          </button>

          {isNavOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
              <NavLink
                to="/"
                className="flex items-center px-4 py-2 text-foreground hover:bg-secondary hover:bg-opacity-50 transition-colors duration-200"
              >
                Cockpit
              </NavLink>
              <NavLink
                to="/dashboard"
                className="flex items-center px-4 py-2 text-foreground hover:bg-secondary hover:bg-opacity-50 transition-colors duration-200"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/settings"
                className="flex items-center px-4 py-2 text-foreground hover:bg-secondary hover:bg-opacity-50 transition-colors duration-200"
              >
                Settings
              </NavLink>
            </div>
          )}
        </div>
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
          aria-label="Menu"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

export default Header;
