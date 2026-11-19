import React from 'react';
import { 
  Sun, 
  Moon, 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  HelpCircle, 
  Compass, 
  User,
  Settings as SettingsIcon,
  Shield
} from 'lucide-react';
import { StudentProfile } from '../types';
import { Link, TabId } from '../router';

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  profile: StudentProfile;
}

export default function Layout({
  children,
  currentTab,
  setCurrentTab,
  theme,
  toggleTheme,
  profile
}: LayoutProps) {
  const navigationItems: Array<{ id: TabId; label: string; icon: any; path: string }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/homepage' },
    { id: 'notes', label: 'Notes', icon: BookOpen, path: '/notes' },
    { id: 'tasks', label: 'Tasks', icon: Briefcase, path: '/tasks' },
    { id: 'doubt-box', label: 'Doubt Box', icon: HelpCircle, path: '/doubts' },
    { id: 'lost-found', label: 'Lost & Found', icon: Compass, path: '/lost-found' },
    ...(profile?.isAdmin ? [{ id: 'admin' as TabId, label: 'Moderation', icon: Shield, path: '/admin' }] : []),
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  // Mobile bottom bar mirrors navigationItems (including Dashboard and Moderation for admins)
  const mobileNavigationItems = navigationItems;

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return (
    <div id="nexus-app-root" className="min-h-screen flex text-text-primary bg-app transition-colors duration-150 font-sans">
      {/* Sidebar - Desktop locked to left icon rail */}
      <aside 
        id="desktop-sidebar"
        className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:z-30 md:w-16 bg-surface border-r border-border-subtle transition-all duration-300"
      >
        <Link
          id="sidebar-logo-btn"
          to="/homepage"
          onClick={() => handleTabClick('dashboard')}
          className="h-16 border-b border-border-subtle flex items-center justify-center px-0 text-left hover:bg-bg-hover/50 transition-colors cursor-pointer w-full"
          title="Go to Homepage"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">
            N
          </div>
        </Link>

        <nav className="flex-1 px-2 py-6 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentTab === item.id;
            return (
              <Link
                key={item.id}
                to={item.path}
                id={`desktop-nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-center py-3 px-0 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive 
                    ? 'bg-accent-muted text-accent-hover dark:bg-accent-muted/20 dark:text-accent-primary border-l-4 border-accent-primary' 
                    : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                }`}
                title={item.label}
                aria-label={item.label}
              >
                <IconComponent size={18} className={isActive ? 'text-accent-primary' : item.id === 'admin' ? 'text-color-danger' : 'text-text-secondary'} />
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border-subtle">
          <Link
            to="/profile"
            onClick={() => handleTabClick('profile')}
            className="flex items-center justify-center py-2 px-0 rounded-lg bg-bg-hover hover:bg-bg-hover/80 transition-colors"
            title={profile ? `${profile.name} • View Profile` : 'View Profile'}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex-shrink-0 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              {profile && profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'ST'}
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Outer Container (with spacing on desktop to account for fixed sidebar) */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 md:pl-16">
        {/* Top Header */}
        <header 
          id="top-header"
          className="sticky top-0 z-20 h-16 bg-surface border-b border-border-subtle flex items-center justify-between px-4 md:px-6 transition-colors duration-150"
        >
          {/* Left: Brand logo for mobile */}
          <div className="flex items-center gap-3">
            <Link
              id="mobile-logo-btn"
              to="/homepage"
              onClick={() => handleTabClick('dashboard')}
              className={`flex items-center gap-2 md:hidden cursor-pointer active:scale-95 transition-all select-none ${
                currentTab === 'dashboard' ? 'opacity-100' : 'opacity-90 hover:opacity-100'
              }`}
              title="Go to Dashboard"
            >
              <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center text-white font-bold text-lg shadow-xs">
                N
              </div>
              <div className="font-bold tracking-wider text-text-primary text-base flex items-center gap-1.5">
                <span>NEXTUS</span>
                <span className="text-[9px] bg-accent-muted text-accent-hover dark:bg-accent-muted/20 dark:text-accent-primary px-1.5 py-0.2 rounded-full font-medium">
                  v1.0
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Settings Button */}
          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              id="settings-nav-btn"
              onClick={() => handleTabClick('settings')}
              className={`p-2 rounded-lg transition-all duration-150 border cursor-pointer active:scale-95 ${
                currentTab === 'settings'
                  ? 'bg-accent-muted text-accent-hover dark:bg-accent-muted/20 dark:text-accent-primary border-accent-primary'
                  : 'text-text-secondary border-border-subtle hover:bg-bg-hover hover:text-text-primary'
              }`}
              title="Settings & Preferences"
            >
              <SettingsIcon size={18} />
            </Link>
          </div>
        </header>

        {/* Scrollable Main Area yields to children */}
        <main 
          id="main-scroll-container"
          className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6"
        >
          {children}
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION: fixed bottom bar with all navigation tabs */}
      <nav 
        id="mobile-bottom-navigation"
        className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-surface border-t border-border-subtle flex items-center justify-around md:hidden px-1"
      >
        {mobileNavigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentTab === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              id={`mobile-bottom-nav-item-${item.id}`}
              onClick={() => handleTabClick(item.id)}
              className="flex flex-col items-center justify-center flex-1 min-w-0 h-full py-1 text-center transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <IconComponent 
                size={18} 
                className={isActive ? 'text-accent-primary scale-110' : item.id === 'admin' ? 'text-color-danger' : 'text-text-secondary'} 
              />
              <span 
                className={`text-[9px] mt-1 font-medium tracking-tight truncate max-w-full px-0.5 transition-colors ${
                  isActive ? 'text-accent-primary font-semibold' : 'text-text-secondary'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
