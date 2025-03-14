
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search, ChevronDown, Leaf, Sprout, BarChart, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
  dropdown?: { title: string; path: string }[];
  requiresAuth?: boolean;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems: NavItem[] = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'PlantWisdom Hub',
      path: '/plant-wisdom',
      icon: <Leaf className="w-5 h-5" />,
      requiresAuth: true,
      dropdown: [
        { title: '3D Plant Explorer', path: '/plant-wisdom/explorer' },
        { title: 'Plant Identification', path: '/plant-wisdom/identification' },
        { title: 'Ayurvedic Knowledge Base', path: '/plant-wisdom/knowledge-base' },
      ]
    },
    {
      title: 'CropInsight Center',
      path: '/crop-insight',
      icon: <Sprout className="w-5 h-5" />,
      requiresAuth: true,
      dropdown: [
        { title: 'Fertilizer Analysis', path: '/crop-insight/fertilizer' },
        { title: 'Disease Detection', path: '/crop-insight/disease' },
        { title: 'Crop Recommendations', path: '/crop-insight/recommendations' },
      ]
    },
    {
      title: 'FarmControl System',
      path: '/farm-control',
      icon: <BarChart className="w-5 h-5" />,
      requiresAuth: true,
      dropdown: [
        { title: 'IoT Dashboard', path: '/farm-control/dashboard' },
        { title: 'Irrigation Control', path: '/farm-control/irrigation' },
        { title: 'Environmental Analysis', path: '/farm-control/environment' },
      ]
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (title: string) => {
    if (activeDropdown === title) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(title);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Filter nav items based on authentication status
  const filteredNavItems = navItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled 
          ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container-standard flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2"
        >
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-greensense-500 to-greensense-600 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            Green<span className="text-greensense-600">Sense</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {filteredNavItems.map((item) => (
            <div key={item.path} className="relative group">
              {item.dropdown ? (
                <button
                  onClick={() => toggleDropdown(item.title)}
                  className={cn(
                    'px-3 py-2 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-all',
                    location.pathname.startsWith(item.path)
                      ? 'text-greensense-600'
                      : 'text-foreground/80 hover:text-greensense-600 hover:bg-greensense-50'
                  )}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.title}
                  <ChevronDown className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    'px-3 py-2 rounded-lg flex items-center gap-1.5 text-sm font-medium transition-all',
                    location.pathname === item.path
                      ? 'text-greensense-600'
                      : 'text-foreground/80 hover:text-greensense-600 hover:bg-greensense-50'
                  )}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.title}
                </Link>
              )}

              {item.dropdown && (
                <div
                  className={cn(
                    'absolute top-full left-0 mt-1 w-64 glass-card py-2 opacity-0 translate-y-2 pointer-events-none transition-all z-50',
                    activeDropdown === item.title && 'opacity-100 translate-y-0 pointer-events-auto'
                  )}
                >
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.path}
                      to={dropdownItem.path}
                      className="block px-4 py-2 text-sm hover:bg-greensense-50 transition-colors"
                    >
                      {dropdownItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium">
                {user?.name}
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-greensense-200 hover:bg-greensense-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth/login"
                className="px-4 py-2 rounded-lg text-greensense-600 border border-greensense-200 hover:bg-greensense-50 transition-colors text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-greensense-500 text-white text-sm font-medium hover:bg-greensense-600 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 flex items-center justify-center"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'fixed inset-0 top-[60px] z-40 bg-white p-4 md:hidden transform transition-transform duration-300 ease-in-out overflow-auto',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <nav className="flex flex-col gap-2 mb-8">
            {filteredNavItems.map((item) => (
              <div key={item.path} className="flex flex-col">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className={cn(
                        'px-4 py-3 rounded-lg flex items-center justify-between text-base font-medium',
                        location.pathname.startsWith(item.path)
                          ? 'bg-greensense-50 text-greensense-600'
                          : 'text-foreground'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon && <span>{item.icon}</span>}
                        {item.title}
                      </div>
                      <ChevronDown className={cn(
                        'w-5 h-5 transition-transform',
                        activeDropdown === item.title && 'rotate-180'
                      )} />
                    </button>
                    {activeDropdown === item.title && (
                      <div className="mt-1 ml-4 border-l-2 border-greensense-100 pl-4 py-2 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            to={dropdownItem.path}
                            className="block py-2 text-sm text-foreground/80 hover:text-greensense-600"
                          >
                            {dropdownItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={cn(
                      'px-4 py-3 rounded-lg flex items-center gap-2 text-base font-medium',
                      location.pathname === item.path
                        ? 'bg-greensense-50 text-greensense-600'
                        : 'text-foreground'
                    )}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <button className="w-full py-2.5 rounded-lg border border-greensense-100 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
            
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="px-4 py-2.5 text-center text-sm font-medium border-b border-gray-100 pb-4">
                  Signed in as <span className="text-greensense-600">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="w-full py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 flex items-center justify-center gap-2 font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/auth/login"
                  className="w-full py-2.5 rounded-lg border border-greensense-200 text-greensense-600 flex items-center justify-center gap-2 font-medium"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/auth/register"
                  className="w-full py-2.5 rounded-lg bg-greensense-500 text-white flex items-center justify-center gap-2 font-medium"
                >
                  <User className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
