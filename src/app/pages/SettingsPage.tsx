import { useState } from 'react';
import { User, Bell, Shield, Globe } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';

export function SettingsPage() {
  const [profileData, setProfileData] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@medpal.com',
    phone: '+1 234-567-8900',
    role: 'Administrator',
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-800 mb-1">Settings</h1>
        <p className="text-sm text-gray-500">Manage your profile and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <User size={20} className="text-blue-600" />
                <h2 className="text-lg">Profile Settings</h2>
              </div>
            </div>
            <form onSubmit={handleProfileUpdate} className="p-6 space-y-4">
              <Input
                label="Full Name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                required
              />
              <Select
                label="Role"
                value={profileData.role}
                onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                options={[
                  { value: 'Administrator', label: 'Administrator' },
                  { value: 'Doctor', label: 'Doctor' },
                  { value: 'Nurse', label: 'Nurse' },
                ]}
                required
              />
              <div className="pt-4">
                <Button type="submit">Update Profile</Button>
              </div>
            </form>
          </Card>

          <Card>
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Bell size={20} className="text-blue-600" />
                <h2 className="text-lg">Notification Preferences</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {[
                { id: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
                { id: 'emergency', label: 'Emergency Alerts', description: 'Get notified for SOS cases' },
                { id: 'appointments', label: 'Appointment Reminders', description: 'Receive appointment notifications' },
                { id: 'reports', label: 'Weekly Reports', description: 'Get weekly analytics reports' },
              ].map((option) => (
                <div key={option.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm mb-1">{option.label}</p>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                <h2 className="text-lg">Security</h2>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <Button variant="outline" className="w-full">Change Password</Button>
              <Button variant="outline" className="w-full">Two-Factor Auth</Button>
              <Button variant="outline" className="w-full">Login History</Button>
            </div>
          </Card>

          <Card>
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Globe size={20} className="text-blue-600" />
                <h2 className="text-lg">System</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <Select
                label="Language"
                value="en"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                ]}
              />
              <Select
                label="Timezone"
                value="est"
                options={[
                  { value: 'est', label: 'Eastern Time (EST)' },
                  { value: 'pst', label: 'Pacific Time (PST)' },
                  { value: 'utc', label: 'UTC' },
                ]}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
