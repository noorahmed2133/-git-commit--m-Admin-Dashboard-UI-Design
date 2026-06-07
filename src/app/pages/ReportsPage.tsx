import { FileText, TrendingUp, Users, Activity } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useReports } from '../hooks/useApi';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function ReportsPage() {
  const { data, loading, error } = useReports();

  const stats = data?.data?.stats;
  const monthlyGrowth = data?.data?.monthlyGrowth ?? [];
  const departmentData = data?.data?.departmentData ?? [];

  const statusData = [
    { name: 'Active', value: data?.data?.stats?.totalPatients ?? 0, color: '#10b981' },
    { name: 'Pending', value: data?.data?.stats?.appointments ?? 0, color: '#f59e0b' },
    { name: 'Reports', value: data?.data?.stats?.reportsGenerated ?? 0, color: '#3b82f6' },
  ];

  const statCards = [
    { title: 'Total Revenue', value: `$${stats?.totalRevenue ?? 0}`, icon: TrendingUp, color: 'blue' },
    { title: 'Total Patients', value: stats?.totalPatients ?? 0, icon: Users, color: 'green' },
    { title: 'Appointments', value: stats?.appointments ?? 0, icon: Activity, color: 'purple' },
    { title: 'Reports Generated', value: stats?.reportsGenerated ?? 0, icon: FileText, color: 'orange' },
  ];

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse h-32 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-800 mb-1">Reports & Analytics</h1>
        <p className="text-sm text-gray-500">Comprehensive healthcare analytics and insights</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} hover>
              <div className="p-6">
                <div className={`w-12 h-12 bg-${stat.color}-50 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
                <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-2xl">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg">Monthly Growth Trends</h2>
            <p className="text-sm text-gray-500 mt-1">Patient and doctor registration over time</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="doctors" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg">Statistics Overview</h2>
            <p className="text-sm text-gray-500 mt-1">Breakdown of key metrics</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {departmentData.length > 0 && (
        <Card>
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg">Department Visits</h2>
            <p className="text-sm text-gray-500 mt-1">Patient visits by department</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
}