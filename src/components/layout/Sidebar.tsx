
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Leaf, 
  Sprout, 
  BarChart, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  children?: { title: string; path: string }[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: <Home className="w-5 h-5" />,
    path: '/dashboard'
  },
  {
    title: 'PlantWisdom Hub',
    icon: <Leaf className="w-5 h-5" />,
    path: '/plant-wisdom',
    children: [
      { title: 'Plant Identification', path: '/plant-wisdom/identification' },
      { title: 'Ayurvedic Knowledge Base', path: '/plant-wisdom/knowledge-base' },
    ]
  },
  {
    title: 'CropInsight Center',
    icon: <Sprout className="w-5 h-5" />,
    path: '/crop-insight',
    children: [
      { title: 'Fertilizer Analysis', path: '/crop-insight/fertilizer' },
      { title: 'Disease Detection', path: '/crop-insight/disease' },
      { title: 'Crop Recommendations', path: '/crop-insight/recommendations' },
    ]
  },
  {
    title: 'FarmControl System',
    icon: <BarChart className="w-5 h-5" />,
    path: '/farm-control',
    children: [
      { title: 'IoT Dashboard', path: '/farm-control/dashboard' },
      { title: 'Irrigation Control', path: '/farm-control/irrigation' },
      { title: 'Environmental Analysis', path: '/farm-control/environment' },
    ]
  }
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      setExpandedItem(null);
    }
  };

  const toggleExpand = (title: string) => {
    if (expandedItem === title) {
      setExpandedItem(null);
    } else {
      setExpandedItem(title);
    }
  };

  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent && !collapsed && expandedItem) {
      mainContent.classList.add('blur-sm', 'transition-all', 'duration-300');
      let overlay = document.getElementById('sidebar-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'sidebar-overlay';
        overlay.className = 'fixed inset-0 bg-black/30 z-20 transition-opacity duration-300';
        overlay.onclick = () => setExpandedItem(null);
        document.body.appendChild(overlay);
      }
    } else {
      mainContent?.classList.remove('blur-sm', 'transition-all', 'duration-300');
      const overlay = document.getElementById('sidebar-overlay');
      if (overlay) {
        document.body.removeChild(overlay);
      }
    }
  }, [collapsed, expandedItem]);

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out z-30 pt-20',
        collapsed ? 'w-[70px]' : 'w-[260px]',
        'bg-white border-r border-border/40 shadow-sm',
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-6 px-3">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <div key={item.path} className="relative">
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center py-2.5 px-3 rounded-lg text-sm font-medium transition-all',
                    (location.pathname === item.path || location.pathname.startsWith(item.path + '/'))
                      ? 'bg-greensense-50 text-greensense-600'
                      : 'text-gray-600 hover:bg-gray-50',
                    collapsed && 'justify-center'
                  )}
                  onClick={() => item.children && !collapsed && toggleExpand(item.title)}
                >
                  <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && <span>{item.title}</span>}
                  </div>
                  {!collapsed && item.children && (
                    <ChevronRight
                      className={cn(
                        'ml-auto w-4 h-4 transition-transform',
                        expandedItem === item.title && 'rotate-90'
                      )}
                    />
                  )}
                </Link>

                {!collapsed && item.children && expandedItem === item.title && (
                  <div className="mt-1 ml-8 pl-3 border-l border-greensense-100 py-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={cn(
                          'block py-2 px-2 rounded-md text-sm transition-colors',
                          location.pathname === child.path
                            ? 'text-greensense-600 font-medium'
                            : 'text-gray-600 hover:text-greensense-600'
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
