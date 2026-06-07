import { Users, Stethoscope, UserRound, AlertCircle, MapPin, Clock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useDashboard } from '../hooks/useApi';

export function DashboardPage() {
  const { data, loading, error } = useDashboard();

  const stats = [
    { title: 'Total Users', value: data?.data?.totalUsers, icon: Users, bgColor: 'bg-blue-50', iconColor: 'text-blue-600', change: '+12.5%' },
    { title: 'Total Doctors', value: data?.data?.totalDoctors, icon: Stethoscope, bgColor: 'bg-green-50', iconColor: 'text-green-600', change: '+8.2%' },
    { title: 'Total Patients', value: data?.data?.totalPatients, icon: UserRound, bgColor: 'bg-purple-50', iconColor: 'text-purple-600', change: '+15.3%' },
    { title: 'Emergency Alerts', value: data?.data?.SOS, icon: AlertCircle, bgColor: 'bg-red-50', iconColor: 'text-red-600', change: `${data?.data?.pendingDoctors ?? 0} Pending` },
  ];

  const recentUsers = data?.data?.recentUsers ?? [];
  const emergencyCases = data?.data?.emergencyCases ?? [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-800 mb-1">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Welcome back, Admin</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">⚠️ {error}</div>
      )}

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
                  <p className="text-3xl">
                    {loading ? (
                      <span className="animate-pulse bg-gray-200 rounded w-16 h-8 inline-block" />
                    ) : (
                      stat.value ?? '—'
                    )}
                  </p>
                  <span className="text-xs px-2 py-1 rounded bg-green-50 text-green-600">{stat.change}</span>
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
              {loading ? (
                <div className="p-6 space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse flex gap-3 items-center">
                      <div className="w-9 h-9 bg-gray-200 rounded-full" />
                      <div className="flex-1 h-4 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              ) : recentUsers.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-400">No recent users</div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs text-gray-600">User</th>
                      <th className="text-left px-6 py-3 text-xs text-gray-600">Role</th>
                      <th className="text-left px-6 py-3 text-xs text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user: any) => (
                      <tr key={user._id || user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">
                              {user.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <span className="text-sm">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4"><span className="text-sm text-gray-600">{user.role}</span></td>
                        <td className="px-6 py-4"><Badge status={user.status}>{user.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-20 bg-gray-200 rounded-lg" />
                  <div className="h-20 bg-gray-200 rounded-lg" />
                </div>
              ) : emergencyCases.length === 0 ? (
                <p className="text-sm text-gray-400 text-center">No active emergencies</p>
              ) : (
                emergencyCases.map((emergency: any) => (
                  <div key={emergency._id || emergency.id} className="border-l-4 border-red-500 bg-red-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-sm mb-1">{emergency.patient || emergency.patientName}</h3>
                        <p className="text-xs text-gray-600">{emergency.type}</p>
                      </div>
                      <Badge status={emergency.priority}>{emergency.priority}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-1"><MapPin size={12} /><span>{emergency.location}</span></div>
                      <div className="flex items-center gap-1"><Clock size={12} /><span>{emergency.time}</span></div>
                    </div>
                    <button className="w-full bg-white text-sm py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}