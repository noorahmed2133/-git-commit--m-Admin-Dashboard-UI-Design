import { LayoutDashboard, Users, Stethoscope, UserRound, FileText, AlertCircle, Settings } from 'lucide-react';
import { NavLink } from 'react-router';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Users Management', path: '/users' },
  { icon: Stethoscope, label: 'Doctors', path: '/doctors' },
  { icon: UserRound, label: 'Patients', path: '/patients' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: AlertCircle, label: 'Emergency (SOS)', path: '/emergency' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col z-20">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl text-blue-600">Medpal</h1>
        <p className="text-xs text-gray-500 mt-1">Healthcare Admin</p>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
