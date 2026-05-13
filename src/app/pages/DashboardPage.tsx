import { Users, Stethoscope, UserRound, AlertCircle, Edit2, Trash2, CheckCircle, MapPin, Clock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const stats = [
  {
    title: 'Total Users',
    value: '2,847',
    icon: Users,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    change: '+12.5%',
  },
  {
    title: 'Total Doctors',
    value: '342',
    icon: Stethoscope,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    change: '+8.2%',
  },
  {
    title: 'Total Patients',
    value: '2,505',
    icon: UserRound,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    change: '+15.3%',
  },
  {
    title: 'Emergency Alerts',
    value: '12',
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    change: '3 Active',
  },
];

const recentUsers = [
  { id: 1, name: 'Dr. Michael Chen', role: 'Doctor', status: 'Active' as const, avatar: 'MC' },
  { id: 2, name: 'Emily Rodriguez', role: 'Patient', status: 'Active' as const, avatar: 'ER' },
  { id: 3, name: 'Dr. James Wilson', role: 'Doctor', status: 'Pending' as const, avatar: 'JW' },
  { id: 4, name: 'Sarah Thompson', role: 'Patient', status: 'Active' as const, avatar: 'ST' },
  { id: 5, name: 'Robert Martinez', role: 'Patient', status: 'Blocked' as const, avatar: 'RM' },
];

const emergencyCases = [
  {
    id: 1,
    patient: 'John Anderson',
    type: 'Cardiac Emergency',
    location: 'Room 305, Building A',
    time: '2 mins ago',
    priority: 'Critical' as const,
  },
  {
    id: 2,
    patient: 'Maria Garcia',
    type: 'Respiratory Distress',
    location: 'ICU Ward 2',
    time: '8 mins ago',
    priority: 'High' as const,
  },
];

export function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-800 mb-1">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Welcome back, Dr. Sarah Johnson</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} hover>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={stat.iconColor} size={24} />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                <div className="flex items-end justify-between">
                  <p className="text-3xl">{stat.value}</p>
                  <span className="text-xs px-2 py-1 rounded bg-green-50 text-green-600">
                    {stat.change}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg">Recent Users</h2>
              <p className="text-sm text-gray-500 mt-1">Latest registered users</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">User</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Role</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Status</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">
                            {user.avatar}
                          </div>
                          <span className="text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge status={user.status}>{user.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-blue-50 rounded text-blue-600 transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 rounded text-red-600 transition-colors">
                            <Trash2 size={16} />
                          </button>
                          {user.status === 'Pending' && (
                            <button className="p-1.5 hover:bg-green-50 rounded text-green-600 transition-colors">
                              <CheckCircle size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <div className="p-6 border-b border-gray-100 bg-red-50">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red-600" size={20} />
                <h2 className="text-lg text-red-600">Emergency SOS</h2>
              </div>
              <p className="text-sm text-red-600 mt-1">Urgent cases</p>
            </div>
            <div className="p-6 space-y-4">
              {emergencyCases.map((emergency) => (
                <div
                  key={emergency.id}
                  className="border-l-4 border-red-500 bg-red-50 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm mb-1">{emergency.patient}</h3>
                      <p className="text-xs text-gray-600">{emergency.type}</p>
                    </div>
                    <Badge status={emergency.priority}>{emergency.priority}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{emergency.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{emergency.time}</span>
                    </div>
                  </div>
                  <button className="w-full bg-white text-sm py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
