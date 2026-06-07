import { useState } from 'react';
import { Trash2, Users as UsersIcon, ShieldOff, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { usePatients, useDoctors, useUsers } from '../hooks/useApi';

export function UsersPage() {
  const { data: patientsData, loading: patientsLoading } = usePatients();
  const { activeDoctors, pendingDoctors, loading: doctorsLoading } = useDoctors();
  const { blockUser, unblockUser, deleteUser, actionLoading } = useUsers();
  const [actionError, setActionError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'patients' | 'doctors'>('all');

  const patients: any[] = patientsData?.data ?? [];

  const allDoctors = [...activeDoctors, ...pendingDoctors];

  const loading = patientsLoading || doctorsLoading;

  const handleBlock = async (userId: string) => {
    if (confirm('Block this user?')) {
      try {
        await blockUser(userId);
      } catch (e: any) {
        setActionError(e.message);
      }
    }
  };

  const handleUnblock = async (userId: string) => {
    try {
      await unblockUser(userId);
    } catch (e: any) {
      setActionError(e.message);
    }
  };

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
      } catch (e: any) {
        setActionError(e.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse h-16 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  const renderPatients = () => (
    patients.map((patient: any) => {
      const id = patient.userId?._id || patient._id;
      const name = patient.userId?.fullName || 'Unknown';
      const avatar = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
      return (
        <tr key={patient._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm">{avatar}</div>
              <div>
                <p className="text-sm">{name}</p>
                <p className="text-xs text-gray-500">{patient.userId?.email}</p>
              </div>
            </div>
          </td>
          <td className="px-6 py-4"><span className="text-sm text-gray-600">{patient.userId?.phone}</span></td>
          <td className="px-6 py-4"><Badge status="Active">Patient</Badge></td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <button onClick={() => handleBlock(id)} disabled={actionLoading} className="p-1.5 hover:bg-orange-50 rounded text-orange-600 transition-colors" title="Block">
                <ShieldOff size={16} />
              </button>
              <button onClick={() => handleDelete(id)} disabled={actionLoading} className="p-1.5 hover:bg-red-50 rounded text-red-600 transition-colors" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </td>
        </tr>
      );
    })
  );

  const renderDoctors = () => (
    allDoctors.map((doctor: any) => {
      const id = doctor.userId?._id || doctor._id;
      const name = doctor.userId?.fullName || doctor.specialization || 'Unknown';
      const avatar = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
      const status = doctor.isVerified ? 'Active' : 'Pending';
      return (
        <tr key={doctor._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">{avatar}</div>
              <div>
                <p className="text-sm">{name}</p>
                <p className="text-xs text-gray-500">{doctor.specialization}</p>
              </div>
            </div>
          </td>
          <td className="px-6 py-4"><span className="text-sm text-gray-600">{doctor.clinicLocation}</span></td>
          <td className="px-6 py-4"><Badge status={status}>Doctor • {status}</Badge></td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              {doctor.isVerified ? (
                <button onClick={() => handleBlock(id)} disabled={actionLoading} className="p-1.5 hover:bg-orange-50 rounded text-orange-600 transition-colors" title="Block">
                  <ShieldOff size={16} />
                </button>
              ) : (
                <button onClick={() => handleUnblock(id)} disabled={actionLoading} className="p-1.5 hover:bg-green-50 rounded text-green-600 transition-colors" title="Unblock">
                  <Shield size={16} />
                </button>
              )}
              <button onClick={() => handleDelete(id)} disabled={actionLoading} className="p-1.5 hover:bg-red-50 rounded text-red-600 transition-colors" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </td>
        </tr>
      );
    })
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-gray-800 mb-1">Users Management</h1>
          <p className="text-sm text-gray-500">Manage all system users ({patients.length + allDoctors.length} total)</p>
        </div>
      </div>

      {actionError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          ⚠️ {actionError}
        </div>
      )}

      <div className="flex gap-2 mb-4">
        {['all', 'patients', 'doctors'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {tab === 'all' ? `All (${patients.length + allDoctors.length})` : tab === 'patients' ? `Patients (${patients.length})` : `Doctors (${allDoctors.length})`}
          </button>
        ))}
      </div>

      <Card>
        {patients.length === 0 && allDoctors.length === 0 ? (
          <EmptyState icon={<UsersIcon size={32} />} title="No users found" description="Users will appear here" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">User</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Phone / Location</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Role / Status</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeTab === 'all' && <>{renderPatients()}{renderDoctors()}</>}
                {activeTab === 'patients' && renderPatients()}
                {activeTab === 'doctors' && renderDoctors()}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}