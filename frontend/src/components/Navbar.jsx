import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Home
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const isDashboard = location.pathname === '/dashboard';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#368dff] to-[#00a962] flex items-center justify-center shadow-md shadow-[#368dff]/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Talent<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#368dff] to-[#00a962]">Lynx</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full bg-[#368dff]/10 text-[#368dff] border border-[#368dff]/20">
                  AI
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-2 text-xs font-bold text-slate-600">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/' ? 'text-[#368dff] bg-blue-50 font-extrabold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
                isDashboard ? 'text-[#368dff] bg-blue-50 font-extrabold' : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          </nav>
        </div>

        {/* Right Section: Badges & Auth Actions */}
        <div className="flex items-center space-x-4">
          
          {/* Status Badges */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#00a962]" />
            <span>Open Graph Parser Active</span>
          </div>

          {/* User Auth Profile / Login & Register Actions */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-2xl bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all text-xs text-left cursor-pointer"
              >
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}`}
                  alt={user.name}
                  className="w-7 h-7 rounded-full bg-white object-cover border border-[#368dff]"
                />
                <div className="hidden sm:block">
                  <div className="font-bold text-slate-900 text-xs leading-none">{user.name}</div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight">{user.role || 'Recruiter'}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 text-xs text-slate-700 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-extrabold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-100 text-slate-800 transition-colors font-semibold"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#368dff]" />
                    <span>Candidate Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors text-left font-bold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#368dff] to-[#00a962] text-white text-xs font-extrabold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
