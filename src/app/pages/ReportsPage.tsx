import { FileText, TrendingUp, Users, Activity } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', patients: 420, doctors: 28, appointments: 650 },
  { month: 'Feb', patients: 485, doctors: 32, appointments: 720 },
  { month: 'Mar', patients: 520, doctors: 35, appointments: 800 },
  { month: 'Apr', patients: 580, doctors: 38, appointments: 890 },
];

const statusData = [
  { name: 'Active', value: 2505, color: '#10b981' },
  { name: 'Pending', value: 248, color: '#f59e0b' },
  { name: 'Blocked', value: 94, color: '#ef4444' },
];

const departmentData = [
  { department: 'Cardiology', visits: 340 },
  { department: 'Neurology', visits: 280 },
  { department: 'Pediatrics', visits: 420 },
  { department: 'Orthopedics', visits: 310 },
  { department: 'General', visits: 520 },
];

export function ReportsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-800 mb-1">Reports & Analytics</h1>
        <p className="text-sm text-gray-500">Comprehensive healthcare analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { title: 'Total Revenue', value: '$145,280', icon: TrendingUp, color: 'blue' },
          { title: 'Total Patients', value: '2,847', icon: Users, color: 'green' },
          { title: 'Appointments', value: '890', icon: Activity, color: 'purple' },
          { title: 'Reports Generated', value: '156', icon: FileText, color: 'orange' },
        ].map((stat) => {
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
              <LineChart data={monthlyData}>
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
            <h2 className="text-lg">User Status Distribution</h2>
            <p className="text-sm text-gray-500 mt-1">Breakdown of user statuses</p>
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
                  fill="#8884d8"
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
    </div>
  );
}
