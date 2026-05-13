import { useState } from 'react';
import { Plus, Edit2, Trash2, Users as UsersIcon } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { EmptyState } from '../components/ui/EmptyState';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending' | 'Blocked';
  avatar: string;
  phone: string;
}

const initialUsers: User[] = [
  { id: 1, name: 'Dr. Michael Chen', email: 'michael.chen@medpal.com', role: 'Doctor', status: 'Active', avatar: 'MC', phone: '+1 234-567-8901' },
  { id: 2, name: 'Emily Rodriguez', email: 'emily.r@email.com', role: 'Patient', status: 'Active', avatar: 'ER', phone: '+1 234-567-8902' },
  { id: 3, name: 'Dr. James Wilson', email: 'james.w@medpal.com', role: 'Doctor', status: 'Pending', avatar: 'JW', phone: '+1 234-567-8903' },
  { id: 4, name: 'Sarah Thompson', email: 'sarah.t@email.com', role: 'Patient', status: 'Active', avatar: 'ST', phone: '+1 234-567-8904' },
  { id: 5, name: 'Robert Martinez', email: 'robert.m@email.com', role: 'Patient', status: 'Blocked', avatar: 'RM', phone: '+1 234-567-8905' },
  { id: 6, name: 'Dr. Lisa Anderson', email: 'lisa.a@medpal.com', role: 'Doctor', status: 'Pending', avatar: 'LA', phone: '+1 234-567-8906' },
];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Patient',
    status: 'Active' as const,
    phone: '',
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Patient', status: 'Active', phone: '' });
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status, phone: user.phone });
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-gray-800 mb-1">Users Management</h1>
          <p className="text-sm text-gray-500">Manage all system users</p>
        </div>
        <Button onClick={handleAddUser}>
          <Plus size={18} className="mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        {users.length === 0 ? (
          <EmptyState
            icon={<UsersIcon size={32} />}
            title="No users found"
            description="Get started by adding your first user to the system"
            action={<Button onClick={handleAddUser}>Add First User</Button>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">User</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Email</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Phone</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Role</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">
                          {user.avatar}
                        </div>
                        <span className="text-sm">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{user.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{user.phone}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{user.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={user.status}>{user.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-1.5 hover:bg-blue-50 rounded text-blue-600 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 hover:bg-red-50 rounded text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 234-567-8900"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { value: 'Patient', label: 'Patient' },
              { value: 'Doctor', label: 'Doctor' },
              { value: 'Admin', label: 'Admin' },
              { value: 'Nurse', label: 'Nurse' },
            ]}
            required
          />
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Blocked', label: 'Blocked' },
            ]}
            required
          />
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
