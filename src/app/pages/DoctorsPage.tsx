import { useState } from 'react';
import { CheckCircle, XCircle, Eye, Stethoscope } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { useDoctors } from '../hooks/useApi';

export function DoctorsPage() {
  const { activeDoctors, pendingDoctors, loading, error, verifyDoctor, rejectDoctor } = useDoctors();
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = async (id: string) => {
    await verifyDoctor(id);
  };

  const handleReject = async (id: string) => {
    if (confirm('Are you sure you want to reject this doctor?')) {
      await rejectDoctor(id);
    }
  };

  const handleViewDetails = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const getAvatar = (doctor: any) => {
    const name = doctor.userId?.name || doctor.specialization || 'DR';
    return name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse h-24 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-800 mb-1">Doctors Management</h1>
        <p className="text-sm text-gray-500">Approve and manage doctor registrations</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          ⚠️ {error}
        </div>
      )}

      {pendingDoctors.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg text-gray-800 mb-4">Pending Approvals ({pendingDoctors.length})</h2>
          <Card>
            <div className="p-6 space-y-4">
              {pendingDoctors.map((doctor: any) => (
                <div key={doctor._id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {getAvatar(doctor)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm mb-1">{doctor.userId?.name || 'Unknown'}</h3>
                          <p className="text-xs text-gray-600">{doctor.specialization} • {doctor.experienceYears} years exp</p>
                          <p className="text-xs text-gray-500 mt-1">License: {doctor.licenseNumbers}</p>
                          <p className="text-xs text-gray-500">Location: {doctor.clinicLocation}</p>
                        </div>
                        <Badge status="Pending">Pending</Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => handleViewDetails(doctor)}>
                          <Eye size={14} className="mr-1" /> View
                        </Button>
                        <Button size="sm" variant="success" onClick={() => handleApprove(doctor._id)}>
                          <CheckCircle size={14} className="mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleReject(doctor._id)}>
                          <XCircle size={14} className="mr-1" /> Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      <div>
        <h2 className="text-lg text-gray-800 mb-4">Active Doctors ({activeDoctors.length})</h2>
        <Card>
          {activeDoctors.length === 0 ? (
            <EmptyState
              icon={<Stethoscope size={32} />}
              title="No active doctors"
              description="Approve pending doctors to see them here"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Doctor</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Specialization</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Experience</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">License</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Location</th>
                    <th className="text-left px-6 py-3 text-xs text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDoctors.map((doctor: any) => (
                    <tr key={doctor._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">
                            {getAvatar(doctor)}
                          </div>
                          <span className="text-sm">{doctor.userId?.name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className="text-sm text-gray-600">{doctor.specialization}</span></td>
                      <td className="px-6 py-4"><span className="text-sm text-gray-600">{doctor.experienceYears} years</span></td>
                      <td className="px-6 py-4"><span className="text-sm text-gray-600">{doctor.licenseNumbers}</span></td>
                      <td className="px-6 py-4"><span className="text-sm text-gray-600">{doctor.clinicLocation}</span></td>
                      <td className="px-6 py-4">
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(doctor)}>
                          <Eye size={14} className="mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Doctor Details" size="md">
        {selectedDoctor && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                {getAvatar(selectedDoctor)}
              </div>
              <div>
                <h3 className="text-lg mb-1">{selectedDoctor.userId?.name || 'Unknown'}</h3>
                <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">License</p>
                <p className="text-sm">{selectedDoctor.licenseNumbers}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Experience</p>
                <p className="text-sm">{selectedDoctor.experienceYears} years</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Qualification</p>
                <p className="text-sm">{selectedDoctor.qualification}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Location</p>
                <p className="text-sm">{selectedDoctor.clinicLocation}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <Badge status={selectedDoctor.isVerified ? 'Active' : 'Pending'}>
                  {selectedDoctor.isVerified ? 'Active' : 'Pending'}
                </Badge>
              </div>
            </div>
            {!selectedDoctor.isVerified && (
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button variant="success" className="flex-1" onClick={() => { handleApprove(selectedDoctor._id); setIsModalOpen(false); }}>
                  <CheckCircle size={16} className="mr-2" /> Approve
                </Button>
                <Button variant="danger" className="flex-1" onClick={() => { handleReject(selectedDoctor._id); setIsModalOpen(false); }}>
                  <XCircle size={16} className="mr-2" /> Reject
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}